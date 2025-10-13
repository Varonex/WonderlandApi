import {CmdCommand} from "../CmdCommand.ts";
import {WONDERLAND_PATHS, generatePath} from "../../Globals.ts";
import fs from "fs/promises";
import Log from "../../Log.ts";
import {Script} from "../../backend/scripts/Script.ts";
import {DB} from "../../backend/DB.ts";
import ScriptTemplate from "../../shared/termplates/Scripts/ScriptTemplate.ts";

/**
 * Commande de lancement d'un script.
 */
export default class ScriptsCommand extends CmdCommand
{
	/* CHAMPS */

	/**
	 * Chemin des scripts.
	 */
	protected readonly path: string = generatePath(WONDERLAND_PATHS.backend, "scripts");

	/**
	 * @inheritDoc
	 */
	protected options = {
		new: {
			commandDescription: "Créé un nouveau script avec le nom désiré.",
			commandCall: this.new.bind(this),
		},
		run: {
			commandDescription: "Exécute le script désiré.",
			commandCall: this.run.bind(this),
		},
	};

	/* METHODES METIER */

	/**
	 * Argument 1. Créé le script précisé.
	 * @private
	 */
	private async new(): Promise<void>
	{
		// Le nom du script est en 2.
		const scriptName: string = this.argv[2];

		// Vérifie l'existence du nom.
		if (scriptName === undefined)
		{
			Log.error(`Nom de script invalide ("${scriptName}")`);
			process.exit(1);
		}

		// Vérifie le fichier si existant.
		const found: string|undefined = await this.searchFile(scriptName);

		if (found !== undefined)
		{ // Erreur.
			Log.error(`Script \"${scriptName}\" déjà existant`);
			process.exit(3);
		}

		// Ecriture.
		await fs.writeFile(
			generatePath(this.path, `${scriptName}.ts`),

			// Génère le template des scripts.
			(new ScriptTemplate({ scriptName: scriptName })).get()
		);

		Log.success(`Le script "${scriptName}" a été créé avec succès`);
	}

	/**
	 * Argument 1. Lance le script précisé.
	 * @private
	 */
	private async run(): Promise<void>
	{
		// Le nom du script est en 0.
		const scriptName: string = this.argv[2];

		// Vérifie l'existence du nom. Filtre "Script".
		if (scriptName === undefined || scriptName === "Script")
		{
			Log.error(`Nom de script invalide ("${scriptName}")`);
			process.exit(1);
		}

		// Retrouve le fichier si existant.
		const found: string|undefined = await this.searchFile(scriptName);

		if (found === undefined)
		{ // Erreur.
			Log.error(`Script \"${scriptName}\" introuvable`);
			process.exit(2);
		}

		// Le nom match, on require & instancie la classe.
		import(`${this.path}/${found}`)
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
			});
	}

	/* IMPLÉMENTATIONS */

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
