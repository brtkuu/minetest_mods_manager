import axios from "axios";
import { downldDependencies } from "./downloadDependencies";
import { getToken } from "./getToken";
import { downloadPackage } from "./downloadPackage";
import * as fs from "fs";
import * as util from "util";
const fileexists = util.promisify(fs.exists);

/**
 * Downloading packages
 *
 * @param {string} username - Package author username
 * @param {string} name - Package name
 * @param {string} type - Package type mod/game/txp
 *
 */
export async function download(
	username: string,
	name: string,
	type: string
): Promise<void> {
	const url = `https://content.minetest.net/api/packages/${username}/${name}/releases`;
	const config = await getToken();
	const correctDir = await fileexists(
		process.cwd() + "/builtin/async/init.lua"
	);

	if (!correctDir || !config) {
		throw new Error("No token file or wrong directory");
	}
	/**
	 * Geting API response with url to download package (if user is in correct directory and file with token exists)
	 */
	const res = await axios.get(url, config);
	/** Packages are stored on two different servers, depending on server, function is calling with different arguments  */
	if (res.data[0].url.match(/http:|https:/g)) {
		await downloadPackage(res.data[0].url, type, "");
	} else {
		await downloadPackage(
			`https://content.minetest.net/${res.data[0].url}`,
			type,
			name
		);
	}
	const urldep = `https://content.minetest.net/api/packages/${username}/${name}/dependencies`;
	const deps = await axios.get(urldep, config);
	await downldDependencies(deps.data[`${username}/${name}`]);
}
