import fs from "fs";
import { ICache } from './ICache';

class Cache implements ICache {
	path = '';

	constructor() {
		if (this.constructor === Cache) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	removeFilenameFromPath(path: string) {
		const arr = path.split('/');
		arr.pop();
		return arr.join('/');
	}

	readFile() {
		if (!fs.existsSync(this.path)) {
			return {};
		}

		const content = fs.readFileSync(this.path, { encoding: 'utf-8' });

		try {
			return JSON.parse(content);

		} catch (err) {
			return {};
		}
	}

	writeFile(content: any) {
		const path = this.removeFilenameFromPath(this.path);
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true });
		}

		fs.writeFileSync(this.path, JSON.stringify(content));
	}
}

export default Cache;