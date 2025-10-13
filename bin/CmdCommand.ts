import fs from "fs/promises";
import Log from "../Log.ts";

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
	commandDescription: string,

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
	 * Chemin racine.
	 * @protected
	 */
	protected readonly path!: string;

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
	 * @param argv - Argv.
	 */
	constructor(argv: string[])
	{
		this.argv = argv;
	}

	/* MÉTHODES METIER */

	protected async parseNextArgument(): Promise<void>
	{
		// Si plus d'argument.
		if (this.argv.length < this.currentArgumentIndex)
			return;

		// Lancement de l'option. Si une option est déjà renseignée, on cherche dans les enfants, sinon on cherche dans la racine.
		const option = (this.currentOption?.children ?? this.options)[this.argv[this.currentArgumentIndex]];

		// Si undefined, on met une erreur.
		if (option === undefined)
		{
			Log.error(`Option "${this.argv[this.currentArgumentIndex]}" invalide`);
			process.exit(1);
		}

		// On assigne.
		this.currentOption = option;

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
	formatOptionsHelp(): string
	{
		// Description globale.
		let res: string[] = [];

		for (const [childName, childOption] of Object.entries(this.options))
			res.push(this.formatOptionHelp(childName, childOption, 0));

		return (res.length > 0 ? res.join("\n") : "");
	}

	/**
	 * Vérifie si un nom de fichier correspond à un prédicat.
	 * @param fileName - Fichier.
	 * @param predicate - Prédicat.
	 */
	protected matchName(fileName: string, predicate: RegExp|string): boolean
	{
		const regexp: RegExp = (predicate instanceof RegExp) ? predicate : new RegExp(predicate);

		return regexp.test(fileName);
	}

	/**
	 * Détermine si un fichier existe dans le sous-dossier concerné.
	 * @param fileName - Nom du fichier à récupérer.
	 * @protected
	 */
	protected async searchFile(fileName: RegExp|string): Promise<string|undefined>
	{
		// Lie le dossier lié.
		const files: string[] = await fs.readdir(this.path);

		// Retrouve le fichier si existant.
		return files.find(file => this.matchName(
			file,
			(fileName instanceof RegExp) ? fileName : `${fileName}.ts`
		));
	}

	/* MÉTHODES ABSTRAITES */

	/**
	 * Lance la commande.
	 */
	abstract execute(): void|Promise<void>;

	/**
	 * Donne la description de la commande.
	 */
	abstract getDescription(): string;
}
