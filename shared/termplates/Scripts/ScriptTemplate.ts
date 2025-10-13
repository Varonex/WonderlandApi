import {FileTemplate} from "../FileTemplate.ts";

/**
 * Interface des champs de l'environnement d'un script.
 */
export interface ScriptTemplateEnvironment
{
	/**
	 * Nom du script.
	 */
	scriptName: string;
}

/**
 * Template d'un script.
 */
export default class ScriptTemplate extends FileTemplate<ScriptTemplateEnvironment>
{
	/* IMPLÉMENTATIONS */

	/**
	 * @inheritDoc
	 */
	override get(): string
	{
		return `import {Script} from "./Script.ts";

export default class ${this.env.scriptName} extends Script
{
	/**
	 * @inheritDoc
	 */
	override async run(): Promise<void>
	{
		// Code de test ici.
	}
}
`;
	}
}
