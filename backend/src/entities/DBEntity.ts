import {BaseEntity} from "typeorm";

/**
 * Classe abstraite ajoutant des traits aux modèles de base de donnée.
 */
export abstract class DBEntity extends BaseEntity
{
	/**
	 * Transforme l'objet en string json.
	 */
	toString(): string
	{
		return JSON.stringify(this);
	}
}
