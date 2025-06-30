import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {BaseModel} from "../BaseModel.ts";

@Entity({
	name: "wonderland_migrations"
})
export class WonderlandMigration extends BaseModel
{
	@PrimaryGeneratedColumn()
	/**
	 * ID.
	 */
	id!: number;

	@Column()
	/**
	 * Timestamp attribuée à la migration.
	 */
	timestamp!: Date;

	@Column()
	/**
	 * Nom de la migration.
	 */
	name!: string;

	@Column()
	/**
	 * Date d'exécution de la migration.
	 */
	migration_date!: Date;
}
