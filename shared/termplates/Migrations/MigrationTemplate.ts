import {FileTemplate} from "../FileTemplate.ts";

/**
 * Interface des champs de l'environnement d'une migration.
 */
export interface MigrationTemplateEnvironment
{
	/**
	 * Suffixe de la migration.
	 */
	migrationName: string;
}

/**
 * Template d'un script.
 */
export default class MigrationTemplate extends FileTemplate<MigrationTemplateEnvironment>
{
	/* IMPLÉMENTATIONS */

	/**
	 * @inheritDoc
	 */
	override get(): string
	{
		return `import {QueryRunner} from "typeorm";
import {Migration} from "../Migration.ts";
import {CannotRollbackError} from "../../Errors/Migrations/CannotRollbackError.ts";

export default class ${this.env.migrationName} extends Migration
{
	/**
	 * @inheritDoc
	 */
	override getDescription(): string
	{
		return "";
	}

	/**
	 * @inheritDoc
	 */
	override async up(queryRunner: QueryRunner): Promise<void>
	{
		// Migration haute ici.
	}

	/**
	 * @inheritDoc
	 */
	override async down(queryRunner: QueryRunner): Promise<void>
	{
		// Migration basse ici. Il faut enlever l'erreur si reneignée.
		throw new CannotRollbackError(this);
	}
}
`;
	}
}
