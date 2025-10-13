/**
 * Erreur à utiliser en cas de migration impossible à rollback.
 */
export class PathError extends Error
{
	/* CHAMPS */

	/**
	 * Chemin.
	 */
	readonly path;

	/* CONSTRUCTEUR */

	/**
	 * @param path - Chemin causant l'erreur.
	 * @param message - Message.
	 */
	constructor(path: string, message?: string) {
		super(message);
		this.path = path;
	}
}
