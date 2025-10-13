/**
 * Classe mère des templates.
 */
export abstract class FileTemplate<Env>
{
	/* CHAMPS */

	/**
	 * Variables d'environnement.
	 * @protected
	 */
	protected env: Env;

	/* CONSTRUCTEUR */

	/**
	 * @param environment - Variables d'environnement utilisables.
	 */
	constructor(environment: Env)
	{
		this.env = environment;
	}

	/* MÉTHODES ABSTRAITES */

	/**
	 * Génère le document.
	 */
	abstract get(): string;
}
