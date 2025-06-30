import {User} from "./Internal/User.ts";
import {Comment} from "./Internal/Comment.ts";
import {WonderlandMigration} from "./Internal/WonderlandMigration.ts";

export const Models = [
	// Commentaire.
	Comment,

	// Utilisateur.
	User,

	// Migrations,
	WonderlandMigration,
];
