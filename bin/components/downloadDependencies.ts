import axios from "axios";
import { getToken } from "./getToken";
import { downloadPackage } from "./downloadPackage";
import { getType } from "../components/getType";

/**
 * Dependencies downloading just like single package
 *
 * @param {Array} data - array of objects with names and authors of packages
 */
export async function downldDependencies(
	data: Array<Record<string, Array<string>>>
): Promise<void> {
	const unique = new Set();
	/** Downloading without repeating  */
	for (const element of data) {
		if (element.is_optional || unique.has(element.packages[0])) {
			continue;
		}
		unique.add(element.packages[0]);
		const type = await getType(element.packages[0]);
		const url = `https://content.minetest.net/api/packages/${element.packages[0]}/releases`;
		const config = await getToken();
		const res = await axios.get(url, config);
		const downloadUrl = res.data[0].url.match(/http:|https:/g)
			? res.data[0].url
			: `https://content.minetest.net/${res.data[0].url}`;

		await downloadPackage(downloadUrl, type, "");
	}
}
