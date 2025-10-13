import {Migration} from "../../../backend/migrations/Migration.ts";

/**
 * Erreur à utiliser en cas de migration impossible à rollback.
 */
export class CannotRollbackError extends Error
{
	/* CHAMPS */

	/**
	 * Migration concernée par l'erreur.
	 */
	public migration: Migration;

	/* CONSTRUCTEUR */

	/**
	 * Ajoute la migration concernée.
	 * @param migration - Migration.
	 */
	constructor(migration: Migration)
	{
		super();
		this.migration = migration;
	}
}
