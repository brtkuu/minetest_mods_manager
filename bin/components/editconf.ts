import fs from "fs";
import util from "util";
import chalk from "chalk";
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const existsPath = util.promisify(fs.exists);

/**
 * Function which changing world.mt file with config for strict world
 *
 * @param {string} world - minetest specyfic world
 * @param {string} mod_name - mod which could to be enabled
 * @param {string} enable - enable true flag
 */
export async function editconfig(
	world: string,
	mod_name: string,
	enable: boolean
): Promise<void> {
	const exists: boolean = await existsPath(
		process.cwd() + "/worlds/" + world
	);
	if (!exists || !enable) {
		throw new Error(
			"World don't exists or you didn't set enalbe/disable option"
		);
	}
	const data: string = await readFile(
		process.cwd() + "/worlds/" + world + "/world.mt",
		{
			encoding: "utf-8",
			flag: "r",
		}
	);
	const obj = Object.fromEntries(
		data.split("\n").map((line) => line.split(" = "))
	);
	obj[mod_name] = enable ? "true" : "false";
	const keys = Object.entries(obj);
	let toWrite = "";
	for (const [key, value] of keys) {
		if (value != undefined) toWrite += key + " = " + value + "\n";
	}
	console.log(chalk.green(toWrite));
	await writeFile(
		process.cwd() + "/worlds/" + world + "/world.mt",
		toWrite,
		"utf-8"
	);
}
