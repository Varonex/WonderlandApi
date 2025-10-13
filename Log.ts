export default class Log
{
	/* METHODES METIER */

	/**
	 * Affiche une erreur.
	 * @param message - Message à afficher.
	 * @param other - Objets annexes.
	 */
	public static error(message: any, ...other: any[]): void
	{
		console.error("[ \x1b[31mERR\x1b[0m ]:", message, ...other);
	}

	/**
	 * Affiche une information.
	 * @param message - Message à afficher.
	 * @param other - Objets annexes.
	 */
	public static info(message: any, ...other: any[]): void
	{
		console.log("[ \x1b[34mINFO\x1b[0m ]:", message, ...other);
	}

	/**
	 * Affiche un message de succès.
	 * @param message - Message à afficher.
	 * @param other - Objets annexes.
	 */
	public static success(message: any, ...other: any[]): void
	{
		console.log("[ \x1b[32mOK\x1b[0m ]:", message, ...other);
	}

	/**
	 * Affiche un message d'alerte.
	 * @param message - Message à afficher.
	 * @param other - Objets annexes.
	 */
	public static warn(message: any, ...other: any[]): void
	{
		console.warn("[ \x1b[33mWARN\x1b[0m ]:", message, ...other);
	}
}
