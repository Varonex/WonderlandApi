/**
 * Interface d'une définition d'option.
 */
export interface OptionDefinition
{
	/**
	 * Méthode à appeler pour l'option.
	 */
	commandCall: () => Promise<void>,

	/**
	 * Description de l'option.
	 */
	commandDescription: string;

	/**
	 * Les sous-options possibles.
	 */
	children?: OptionsDefinition,
}

/**
 * Type de l'arborescence de définition d'options.
 */
export type OptionsDefinition = {[commandName: string]: OptionDefinition};

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

	/**
	 * Définition des options selon une arborescence d'exécution.
	 * @protected
	 */
	protected options: OptionsDefinition = {};

	/**
	 * Option actuelle.
	 * @private
	 */
	private currentOption?: OptionDefinition;

	/**
	 * Indexe d'option parsé actuel. Défaut à 1.
	 * @private
	 */
	private currentArgumentIndex: number = 1;

	/* CONSTRUCTEUR */

	/**
	 * Constructeur qui assigne argv.
	 * @param argv - Argv.
	 */
	constructor(argv: string[])
	{
		this.argv = argv;
	}

	/* METHODES METIER */

	protected async parseNextArgument(): Promise<void>
	{
		// Si plus d'argument.
		if (this.argv.length < this.currentArgumentIndex)
			return;

		// Lancement de l'option. Si une option est déjà renseignée, on cherche dans les enfants, sinon on cherche dans la racine.
		this.currentOption = (this.currentOption?.children ?? this.options)[this.argv[this.currentArgumentIndex]];

		// On incrémente l'indexe.
		this.currentArgumentIndex++;

		// Si existant, on lance le call.
		await this.currentOption?.commandCall();
	}

	/**
	 * Formatte l'aide pour une option & descend dans les options filles.
	 * @param commandName - Nom de la commande.
	 * @param option - Option.
	 * @param nestLevel - Niveau de nest. Pour placer les tabulations.
	 * @private
	 */
	private formatOptionHelp(commandName: string, option: OptionDefinition, nestLevel: number): string
	{
		// On fait la description pour l'option actuelle.
		let res: string[] = [
			`${"\t".repeat(nestLevel)}- ${commandName}: ${option.commandDescription}`
		];

		// On parcourt les enfants pour nester ça.
		if (option.children != null)
		{
			for (const [childName, childOption] of Object.entries(option.children))
				res.push(this.formatOptionHelp(childName, childOption, nestLevel + 1));
		}

		// Restructuration par \n.
		return res.join("\n");
	}

	/**
	 * Formatte l'aide pour les options.
	 */
	public formatOptionsHelp(): string
	{
		// Description globale.
		let res: string[] = [];

		for (const [childName, childOption] of Object.entries(this.options))
			res.push(this.formatOptionHelp(childName, childOption, 0));

		return (res.length > 0 ? res.join("\n") : "");
	}

	/* METHODES ABSTRAITES */

	/**
	 * Lance la commande.
	 */
	abstract execute(): void|Promise<void>;

	/**
	 * Donne la description de la commande.
	 */
	abstract getDescription(): string;
}
