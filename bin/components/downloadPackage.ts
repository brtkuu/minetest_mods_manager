import { DownloaderHelper } from "node-downloader-helper";
import { unzip } from "./unzip";
import * as fs from "fs";
import * as util from "util";
import * as cliProgress from "cli-progress";
const fileexists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);

/**
 * Download single package
 *
 * @param {string} dlUrl - dowload link
 * @param {string} type - type of package
 * @param {string} packageName - package name
 * @returns {string} - return string
 */
export async function downloadPackage(
	dlUrl: string,
	type: string,
	packageName: string
): Promise<string> {
	let totalSize: number;

	const PackageTypeToPath: Record<string, unknown> = {
		mod: "/mods",
		txp: "/textures/base/pack",
		game: "/games/minimal",
	};
	/**
	 * Downloading packages to correct directory
	 *
	 * @param {string} dlUrl - url with file to download
	 * @param {string} type - type of downloading package (mod/txp/game)
	 * When main package download is done, calling dependences download module
	 */
	const destination: string =
		process.cwd() + PackageTypeToPath[type] + `/${packageName}`;
	const dirExists = await fileexists(destination);
	if (packageName && !dirExists) {
		await mkdir(destination);
	}
	const dl = new DownloaderHelper(dlUrl, destination);
	/**
	 * On end download, getting list of dependencies from downloaded mod and calling download required dependencies function
	 */
	return new Promise((resolve, reject) => {
		dl.on("end", (res) => {
			console.log("Download Completed!");
			unzip(destination + "/" + res.fileName, destination);
			resolve(res.fileName);
		});
		dl.on("error", (err) => {
			reject(err);
		});
		/**
		 * Display download progress info
		 */
		const opt = {
			format: `\r Progress [{bar}] {percentage}%`,
			barCompleteChar: "\u2588",
			barIncompleteChar: "\u2591",
			hideCursor: true,
		};
		const b1 = new cliProgress.SingleBar({}, opt);
		dl.on("progress", (dlInfo) => {
			const acctualDownload: number = dlInfo.downloaded;
			const progress = Math.round((acctualDownload / totalSize) * 100);
			// process.stdout.write(`--Progress: ${progress} %--\r`);
			// initialize the bar - defining payload token "speed" with the default value "N/A"
			b1.start(100, 0, {});

			// update values
			b1.increment();
			b1.update(progress);

			// stop the bar
			b1.stop();
		});
		dl.on("download", (dlInfo) => {
			totalSize = dlInfo.totalSize;
		});
		dl.start();
	});
}
