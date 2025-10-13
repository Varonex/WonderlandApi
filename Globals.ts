/**
 * Gestion des globales.
 */

/**
 * Root directory.
 */
const root = __dirname;

/**
 * Chemins globaux de l'API.
 */
export const WONDERLAND_PATHS = {
	root: root,

	/**
	 * backend.
	 */
	backend: generatePath(root, "backend"),

	/**
	 * Fichiers binaires.
	 */
	bin: generatePath(root, "bin"),

	/**
	 * Frontend.
	 */
	frontend: generatePath(root, "frontend"),

	shared: generatePath(root, "shared"),

	/**
	 * Fichiers de template.
	 */
	templates: generatePath(root, "shared", "termplates"),
}

/**
 * Génère un chemin.
 * @param path - Chemin intermédiaire. jusqu'au fichier.
 */
export function generatePath(...path: string[]): string
{
	return path.join("/");
}
