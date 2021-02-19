import fs from "fs";

class Cache {
	constructor() {
		if (this.constructor == Cache) {
			throw new Error("Abstract classes can't be instantiated.");
		}
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

	writeFile(content) {
		fs.writeFileSync(this.path, JSON.stringify(content));
	}
}

export default Cache;