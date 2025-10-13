import {QueryRunner} from "typeorm";

/**
 * Classe abstraite des migrations.
 */
export abstract class Migration
{
	/**
	 * Permet d'obtenir la description de la migration.
	 */
	public abstract getDescription(): string;

	/**
	 * Fait la migration vers le haut : ajoute les modifications désirées.
	 * @param queryRunner
	 */
	public abstract up(queryRunner: QueryRunner): Promise<void>;

	/**
	 * Fait la migration vers le bas : supprime les modifications désirées.
	 * @param queryRunner
	 */
	public abstract down(queryRunner: QueryRunner): Promise<void>;
}
