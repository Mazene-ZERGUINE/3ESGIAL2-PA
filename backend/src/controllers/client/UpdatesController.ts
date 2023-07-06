import e, { Request, Response } from 'express';
import { body } from 'express-validator';
import * as fs from 'fs';
import path from 'path';
const archiver = require('archiver');

export function checkUpdates(req: Request, res: Response): void {
	const currentVersion: string = req.params.current_version;

	var currentVersions: string[] = currentVersion.split('.');

	const updatesPath = path.join(__dirname, '../../../updates');

	fs.readdir(updatesPath, { withFileTypes: true }, (err, files) => {
		if (err) {
			console.error('Error reading directory:', err);
			return;
			res.status(400).send('no updates found in updates folder');
		}

		const folders = files.filter((file) => file.isDirectory());
		let newVersion = null;

		folders.forEach((folder) => {
			var updatesVersion: string[] = folder.name.split('.');
			if (Number(updatesVersion[0]) > Number(currentVersions[0])) {
				newVersion = folder.name;
			}
			if (Number(updatesVersion[1]) > Number(currentVersions[1])) {
				newVersion = folder.name;
			}
			if (Number(updatesVersion[1]) > Number(currentVersions[1])) {
				newVersion = folder.name;
			}
		});
		if (newVersion !== null) {
			res.status(200).send({ code_status: 200, message: 'a new version is released', version: newVersion });
			return;
		} else {
			res.status(403).send({ code_status: 200, message: 'no updates released yet' });
		}
	});
}

export function sendUpdatesFile(req: Request, res: Response): void {
	const version = req.params.version;
	console.log(req.params);
	const filePath = path.join(__dirname, '../../../updates', version + '/clm.jar');
	if (fs.existsSync(filePath)) {
		// Send the file to the client
		res.sendFile(filePath);
	} else {
		res.status(404).send('Updates file not found.');
	}
}

export function checkForExportFormats(req: Request, res: Response): void {
	const exportPaths = path.join(__dirname, '../../../exports');

	fs.readdir(exportPaths, { withFileTypes: true }, (err, files) => {
		if (err) {
			console.error('Error reading directory:', err);
			res.status(400).send('no updates found in updates folder');
			return;
		}

		const folders: string[] = [];
		files.filter((file) => {
			if (file.isDirectory()) {
				folders.push(file.name);
			}
		});

		res.send({ status_code: 200, exports: folders });
	});
}

export function sendExportsFiles(req: Request, res: Response): void {
	const format: any = req.params.format;
	const folderPath = path.join(__dirname, '../../../exports', format);

	// Create a zip archive
	const archive = archiver('zip', {
		zlib: { level: 9 }, // Set compression level (optional)
	});

	res.attachment(format + '.zip');
	archive.pipe(res);
	archive.directory(folderPath, false);
	archive.finalize();

	res.on('finish', () => {
		const zipFilePath = folderPath + '.zip';
		fs.unlink(zipFilePath, (err) => {
			if (err) {
				console.error('Error deleting the zip file:', err);
			} else {
				console.log('Zip file deleted successfully');
			}
		});
	});
}
