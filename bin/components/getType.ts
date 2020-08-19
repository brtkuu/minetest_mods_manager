import axios from "axios";
import { getToken } from "./getToken";

/**
 * Function return type of dependence
 *
 * @param {string} element - package name
 * @returns {string} - return type of package
 */
export async function getType(element: string): Promise<string> {
	const config = await getToken();
	const type = await axios.get(
		`https://content.minetest.net/api/packages/${element}`,
		config
	);
	return type.data.type;
}
