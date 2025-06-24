import fs from "fs/promises";
import {__WONDERLAND_API_BACKEND_PATH__} from "../../Globals.ts";
import Log from "../../Log.ts";
import {CmdCommand} from "./CmdCommand.ts";

/**
 * Point d'entrée de chaque commande bin/wlnd.
 */

/**
 * Vérifie si une commande correspond à un fichier.
 * @param commandName - Commande.
 * @param fileName - Fichier.
 */
function matchName(commandName: string, fileName: string): boolean
{
	// Transformations.
	commandName = commandName[0].toUpperCase() + commandName.slice(1).toLowerCase();

	return (new RegExp(`^${commandName}Command.ts$`)).test(fileName);
}

async function main()
{
	// Le nom de la commande est en 2.
	const commandName: string = process.argv[2];
	const dirPath: string = __WONDERLAND_API_BACKEND_PATH__ + "/Binaries/Commands";

	// Les fichiers dans ./Commands.
	const files: string[] = await fs.readdir(dirPath);

	// Parcours des fichiers pour déterminer quel exécutable est bon.
	for (const file of files)
	{
		// Matching du nom.
		if (matchName(commandName, file))
		{ // Le nom match, on require & instancie la classe.
			import(`${dirPath}/${file}`)
				.then((module) => {
					// On prend l'objet défaut.
					const cls = module.default;

					// On lance la commande.
					((new cls()) as CmdCommand).execute(process.argv.slice(3));
				});

			// On quitte.
			return;
		}
	}

	// Erreur.
	Log.error(`Commande ${commandName} introuvable pour le dispatch`);
}

// Lancement.
main();
