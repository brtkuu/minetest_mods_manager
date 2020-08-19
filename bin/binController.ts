#!/usr/bin/env ts-node

import * as yargs from "yargs";
import { search } from "./components/search";
import { download } from "./components/downld";
import { editconfig } from "./components/editconf";

yargs
	.usage("usage: <command>")
	.command({
		command: "search",
		builder: (yargs) => {
			return yargs.options({
				q: { type: "string", alias: "query" },
				t: { choices: ["mod", "game", "txp"], alias: "type" },
				h: { type: "string", alias: "hide" },
			});
		},
		handler: (argv) => {
			search(String(argv.q), String(argv.t), String(argv.h));
		},
	})
	.command({
		command: "download",
		builder: (yargs) => {
			return yargs.options({
				u: {
					type: "string",
					alias: "username",
					demandOption: true,
				},
				t: {
					choices: ["mod", "game", "txp"],
					alias: "type",
					demandOption: true,
				},
				n: { type: "string", alias: "name", demandOption: true },
			});
		},
		handler: (argv) => {
			download(String(argv.u), String(argv.n), String(argv.t));
		},
	})
	.command({
		command: "editconfig",
		builder: (yargs) => {
			return yargs.options({
				n: {
					alias: "mod_name",
					type: "string",
					demandOption: true,
				},
				w: { alias: "world", type: "string", demandOption: true },
				e: { alias: "enable", type: "boolean" },
			});
		},
		handler: (argv) => {
			editconfig(String(argv.n), String(argv.w), Boolean(argv.e));
		},
	}).argv;
