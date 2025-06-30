/**
 * Gestion des globales.
 */

import {PathError} from "./Backend/Errors/PathError.ts";

/**
 * Chemin absolu de l'api.
 */
export const __WONDERLAND_API_PATH__ = __dirname;

/**
 * Chemin absolu du backend.
 */
export const __WONDERLAND_API_BACKEND_PATH__ = __WONDERLAND_API_PATH__ + "/Backend";

/**
 * Chemin absolu du frontend.
 */
export const __WONDERLAND_API_FRONTEND_PATH__ = __WONDERLAND_API_PATH__ + "/Frontend";

/**
 * Génère un chemin.
 * @param path - Chemin intermédiaire. jusqu'au fichier.
 */
export function generatePath(...path: string[]): string
{
	return path.join("/");
}
