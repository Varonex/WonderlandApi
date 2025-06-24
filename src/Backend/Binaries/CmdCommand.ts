/**
 * Classe mère des commandes exécutables.
 */
export abstract class CmdCommand
{
	/* CHAMPS */

	/**
	 * Argv.
	 * @protected
	 */
	protected argv: string[];

	/* CONSTRUCTEUR */

	/**
	 * Constructeur qui assigne argv.
	 * @param argv
	 */
	constructor(argv: string[])
	{
		this.argv = argv;
	}

	/* METHODES METIER */

	/**
	 * Vérifie si un paramètre est dans argv. Si oui, retourne l'indexe, sinon retourne null.
	 * @param param - Paramètre à chercher.
	 */
	public hasParam(param: string): number|null
	{
		const index: number = this.argv.indexOf(param);

		return (index !== -1)
			? index
			: null;
	}

	/* METHODES ABSTRAITES */

	/**
	 * Lance la commande.
	 */
	public abstract execute(): void|Promise<void>;
}
