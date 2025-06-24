/**
 * Classe mère des commandes exécutables.
 */
export abstract class CmdCommand
{
	/* METHODES ABSTRAITES */

	/**
	 * Lance le script.
	 * @param argv - Tableau d'arguments.
	 */
	public abstract execute(argv: string[]): void|Promise<void>;
}
