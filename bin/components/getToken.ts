import fs from "fs";
import util from "util";
const readFile = util.promisify(fs.readFile);
const pathExists = util.promisify(fs.exists);

/**
 * Read token from token.txt file
 *
 * @returns {object} - return object with config or throw error
 */
export async function getToken(): Promise<Record<string, unknown>> {
	const exists: boolean = await pathExists(process.cwd() + "/token.txt");
	if (exists) {
		const token: string = await readFile(
			process.cwd() + "/token.txt",
			"utf-8"
		);
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		return { headers };
	} else {
		throw new Error("No token file");
	}
}
