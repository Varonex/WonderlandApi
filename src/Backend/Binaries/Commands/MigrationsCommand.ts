import {CmdCommand} from "../CmdCommand.ts";

export default class MigrationsCommand extends CmdCommand
{
	/* CHAMPS */

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
