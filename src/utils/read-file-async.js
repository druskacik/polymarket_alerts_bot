import fs from 'fs';

const readFileAsync = path => new Promise((resolve, reject) => {
	fs.readFile(path, (err, data) => {
		if (err) {
			reject(err);
		}
		resolve(data.toString());
	});
});

export default readFileAsync;