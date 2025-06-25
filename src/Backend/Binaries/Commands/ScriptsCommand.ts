import {CmdCommand} from "../CmdCommand.ts";
import {__WONDERLAND_API_BACKEND_PATH__} from "../../../Globals.ts";
import fs from "fs/promises";
import Log from "../../../Log.ts";
import {Script} from "../../Scripts/Script.ts";
import {DB} from "../../DB.ts";

/**
 * Commande de lancement d'un script.
 */
export default class ScriptsCommand extends CmdCommand
{
	/* CHAMPS */

	/**
	 * Chemin des scripts.
	 */
	readonly scriptsPath: string = __WONDERLAND_API_BACKEND_PATH__ + "/Scripts";

	/**
	 * @inheritDoc
	 */
	protected options = {
		new: {
			commandDescription: "Créé un nouveau script avec le nom désiré.",
			commandCall: async() => console.log("Option new utilisée"),
		},
		run: {
			commandDescription: "Exécute le script désiré.",
			commandCall: this.run.bind(this),
		},
	};

	/* METHODES METIER */

	/**
	 * Vérifie si un script correspond à un fichier.
	 * @param scriptName - Script.
	 * @param fileName - Fichier.
	 */
	private matchName(scriptName: string, fileName: string): boolean
	{
		// Evite de lancer le fichier "Script.ts".
		return fileName !== "Script" && (new RegExp(`^${scriptName}.ts$`)).test(fileName);
	}

	/**
	 * Argument 1. Lance le script précisé.
	 * @private
	 */
	private async run(): Promise<void>
	{
		// Le nom du script est en 0.
		const scriptName: string = this.argv[2];

		// Les fichiers dans Backend/Scripts.
		const files: string[] = await fs.readdir(this.scriptsPath);

		// Parcours des fichiers pour déterminer quel exécutable est bon.
		for (const file of files)
		{
			// Matching du nom.
			if (this.matchName(scriptName, file))
			{ // Le nom match, on require & instancie la classe.
				import(`${this.scriptsPath}/${file}`)
					.then(async(module) => {
						// On prend l'objet exporté par défaut.
						const cls = module.default;

						// On ouvre la connexion.
						await DB.initialize();

						// On lance la commande.
						try
						{
							await ((new cls()) as Script).run(this.argv);
							Log.success(`Le script "${scriptName}" a été exécuté avec succès`);
						}
						catch(err)
						{
							Log.error(`Le script "${scriptName}" a rencontré une erreur d'exécution`);
							throw err;
						}
						finally
						{
							// On referme la connexion.
							await DB.destroy();
						}
					})

				// On quitte.
				return;
			}
		}

		// Erreur.
		Log.error(`Script \"${scriptName}\" introuvable`);
	}

	/* IMPLEMENTATIONS */

	/**
	 * @inheritDoc
	 */
	async execute(): Promise<void>
	{
		await this.parseNextArgument();
	}

	/**
	 * @inheritDoc
	 */
	getDescription(): string
	{
		return "Permet de gérer les scripts.";
	}
}
