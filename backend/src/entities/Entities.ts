import {User} from "./Internal/User.ts";
import {Comment} from "./Internal/Comment.ts";
import {WonderlandMigration} from "./Internal/WonderlandMigration.ts";

export const Entities = [
	// Commentaire.
	Comment,

	// Utilisateur.
	User,

	// migrations,
	WonderlandMigration,
];
