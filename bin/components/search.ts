import * as chalk from "chalk";
import axios from "axios";
import reader = require("readline-sync");
import qs = require("querystringify");
import { getToken } from "./getToken";

/**
 * Sending query to API and listing responses in console
 *
 * @param {string} query - short user query to find fit responses
 * @param {string} type - mods/txp/game
 * @param {string} hide - hide responses with this string
 * Display response from API in console
 */
export async function search(
	query: string,
	type: string,
	hide: string
): Promise<void> {
	const config = await getToken();

	if (!config) {
		throw new Error("File with token don't exists");
	}
	/** Creating query url */
	const queryParms: Record<string, unknown> = {
		q: query ? query.replace(",", "+") : "",
		type: type ? type : "",
		hide: hide ? hide.replace(",", "+") : "",
		// sort: options.sort ? options.sort : "",
		// order: options.order ? options.sort : "",
	};

	const url = `https://content.minetest.net/api/packages/?${qs.stringify(
		queryParms
	)}`;

	const data = (await axios.get(url, config)).data;

	/**
	 * Listing results from getting by axios from ContentDB API
	 */
	if (data.length == 0) {
		console.log(chalk.red("No results"));
		return;
	}
	if (data.length <= 10) {
		for (const element of data) {
			display(element);
		}
		return;
	}
	let read = "";
	do {
		for (let i = 0; i < 10 && data[i]; i++) {
			display(data[i]);
		}
		data.splice(0, 10);
		if (data.length) {
			read = reader.question(chalk.cyan("more or done: "));
			console.log(chalk.magenta("-".repeat(90)));
		}
	} while (read == "more" && data.length);
}
/**
 * Display single element from response array
 *
 * @param {Object} element - single response object
 */
function display(element: Record<string, unknown>) {
	console.log(chalk.yellow("Author: ") + chalk.green(element.author));
	console.log(chalk.yellow("Name: ") + chalk.green(element.name));
	console.log(
		chalk.yellow("Short description: ") +
			chalk.green(element.short_description)
	);
	console.log(chalk.yellow("Type: ") + chalk.green(element.type));
	console.log(chalk.magenta("-".repeat(90)));
}
