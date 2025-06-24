import {Db} from "../Db.ts";
import {User} from "../Models/Internal/User";
import {Script} from "./Script.ts";
import Log from "../../Log.ts";

export default class FetchUsers extends Script
{
	override async run()
	{
		try
		{
			await Db.initialize();
			Log.info("Db initialized!");

			const userRepo = Db.getRepository(User);

			const users = await userRepo.find({
				relations: ["comments"]
			});

			Log.success("Fetched users:", users);

			users.forEach(user => Log.info(`name = ${user.username}`));

			await Db.destroy();
		}
		catch (err)
		{
			Log.error(err);
		}

		throw new Error("TEST");
	}
}
