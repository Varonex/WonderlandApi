import {CmdCommand} from "../CmdCommand.ts";
import {WONDERLAND_PATHS, generatePath} from "../../Globals.ts";
import Log from "../../Log.ts";
import fs from "fs/promises";
import MigrationTemplate from "../../shared/termplates/Migrations/MigrationTemplate.ts";
import {DB} from "../../backend/DB.ts";
import {WonderlandMigration} from "../../backend/src/entities/Internal/WonderlandMigration.ts";

export default class MigrationsCommand extends CmdCommand
{
	/* CHAMPS */

	/**
	 * Chemin des scripts.
	 */
	protected readonly path: string = generatePath(WONDERLAND_PATHS.backend, "migrations", "migrations");

	/**
	 * @inheritDoc
	 */
	protected options = {
		new: {
			commandCall: this.new.bind(this),
			commandDescription: "Créé une nouvelle migration du nom désiré.",
		},
	};

	/* METHODES METIER */

	/**
	 * Argument 1. Créé une migration au nom précisé.
	 * @private
	 */
	private async new(): Promise<void>
	{
		// Le nom du script est en 2.
		const unformattedName: string = this.argv[2];

		// Vérifie l'existence du nom.
		if (unformattedName === undefined)
		{
			Log.error(`Nom de migration invalide ("${unformattedName}")`);
			process.exit(1);
		}

		// Modification du nom.
		const date: Date = new Date()
		const dateStr: string = date
			.toISOString()
			.slice(0, -5) // Coupe la fin.
			.replace(/[-.:]/g, "") // Remplace les caractères avec du vide.
			.replace(/T/g, "_"); // Remplace le séparateur de date de la timestamp.

		const migrationName = `_${dateStr}_${unformattedName}`;

		// Vérifie le fichier si existant.
		const found: string|undefined = await this.searchFile(migrationName);

		if (found !== undefined)
		{ // Erreur.
			Log.error(`Migration \"${migrationName}\" déjà existante`);
			process.exit(3);
		}

		// Ecriture.
		const filePath: string = generatePath(this.path, `${migrationName}.ts`);
		await fs.writeFile(
			filePath,

			// Génère le template des migrations.
			(new MigrationTemplate({ migrationName: migrationName })).get()
		);

		// Création de la migration dans la db.
		await DB.initialize();

		const migration = new WonderlandMigration();
		migration.timestamp = date;
		migration.name = unformattedName;

		await migration.save()
			.then(() => {
				// Succès.
				Log.success(`La migration "${migrationName}" a été créée avec succès`);
			})
			.catch(() => {
				// Erreur d'insertion.
				Log.error("La migration n'a pas pu être insérée en base de donnée");

				// Suppression du fichier.
				fs.unlink(filePath);
			})
			.finally(async() => {
				// Fermeture de la db.
				await DB.destroy();
			});
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
		return "Gestionnaire des migrations";
	}
}
