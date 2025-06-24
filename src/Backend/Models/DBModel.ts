/**
 * Classe abstraite ajoutant des traits aux modèles de base de donnée.
 */
export abstract class DBModel
{
	/**
	 * Transforme l'objet en string json.
	 */
	toString(): string
	{
		return JSON.stringify(this);
	}
}
