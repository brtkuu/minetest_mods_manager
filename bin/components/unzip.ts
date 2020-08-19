import extract from "extract-zip";
import * as fs from "fs";
import chalk from "chalk";

/**
 * Unpacking *.zip files
 *
 * @param {string} source - File name to be unpacked
 * @param {string} typePath - Folder name
 */
export async function unzip(source: string, typePath: string): Promise<void> {
	await extract(source, {
		dir: typePath,
	});
	await fs.promises.unlink(source);
	console.log(chalk.green("Unneeded file deleted!"));
}
