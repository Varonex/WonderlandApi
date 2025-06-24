/**
 * Classe mère des scripts.
 */
export abstract class Script
{
	/* METHODES ABSTRAITES */

	/**
	 * Lance le script.
	 * @param argv - Tableau d'arguments.
	 */
	public abstract run(argv: string[]): Promise<void>;
}
