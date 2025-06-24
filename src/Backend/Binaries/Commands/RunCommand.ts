import {CmdCommand} from "../CmdCommand.ts";
import {__WONDERLAND_API_BACKEND_PATH__} from "../../../Globals.ts";
import fs from "fs/promises";
import Log from "../../../Log.ts";
import {Script} from "../../Scripts/Script.ts";

/**
 * Commande de lancement d'un script.
 */
export default class RunCommand extends CmdCommand
{
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

	/* IMPLEMENTATIONS */

	async execute(): Promise<void>
	{
		// Le nom du script est en 0.
		const scriptName: string = this.argv[0];
		const dirPath: string = __WONDERLAND_API_BACKEND_PATH__ + "/Scripts";

		// Les fichiers dans Backend/Scripts.
		const files: string[] = await fs.readdir(dirPath);

		// Parcours des fichiers pour déterminer quel exécutable est bon.
		for (const file of files)
		{
			// Matching du nom.
			if (this.matchName(scriptName, file))
			{ // Le nom match, on require & instancie la classe.
				import(`${dirPath}/${file}`)
					.then(async(module) => {
						// On prend l'objet exporté par défaut.
						const cls = module.default;

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
					})

				// On quitte.
				return;
			}
		}

		// Erreur.
		Log.error(`Script ${scriptName} introuvable`);
	}
}
