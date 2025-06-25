import {DataSource, DefaultNamingStrategy, NamingStrategyInterface} from "typeorm";
import {Models} from "./Models/Models.ts";
import {snakeCase} from "typeorm/util/StringUtils";

/* STRATEGIES */

/**
 * Stratégie de nommage pour déduire le nom des colonnes, tables, ... depuis leur reflection.
 */
class snakeCaseStrategy extends DefaultNamingStrategy
{
	/**
	 * Génère le nom d'une table.
	 * @param className
	 * @param customName
	 */
	tableName(className: string, customName?: string): string
	{
		return customName ?? `${snakeCase(className)}s`;
	}

	/**
	 * Génère le nom d'une colonne.
	 * @param propertyName
	 * @param customName
	 * @param embeddedPrefixes
	 */
	columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string
	{
		return snakeCase(embeddedPrefixes.concat(customName ?? propertyName).join("_"));
	}

	/**
	 * Génère le nom d'une relation.
	 * @param propertyName
	 */
	relationName(propertyName: string): string
	{
		return snakeCase(propertyName);
	}

	/**
	 * Génère le nom de colonne pour une jointure.
	 * @param relationName
	 * @param referencedColumnName
	 */
	joinColumnName(relationName: string, referencedColumnName: string): string
	{
		return snakeCase(`${relationName}_${referencedColumnName}`);
	}

	/**
	 * Génère le nom de table & les agrégats pour une jointure.
	 * @param firstTableName
	 * @param secondTableName
	 * @param firstPropertyName
	 * @param secondPropertyName
	 */
	joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string, secondPropertyName: string): string
	{
		return snakeCase(`${firstTableName}_${firstPropertyName.replace(/\./g, "_")}_${secondTableName}`)
	}

	/**
	 * Génère le nom de colonne.
	 * @param tableName
	 * @param propertyName
	 * @param columnName
	 */
	joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string
	{
		return snakeCase(`${tableName}_${columnName ? columnName : propertyName}`);
	}
}

/* DATA SOURCES */

/**
 * Connexion à la base de données.
 */
export const DB = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "remik",
	password: "password",
	database: "wonderland",
	entities: Models,
	synchronize: false,
	namingStrategy: new snakeCaseStrategy(),
});
