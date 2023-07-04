import e, { Request, Response } from 'express';
import { body } from 'express-validator';
import * as fs from 'fs';
import path from 'path';

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
	console.log(filePath);
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
			return;
			res.status(400).send('no updates found in updates folder');
		}

		const folders = files.filter((file) => file.isDirectory()).filter((file) => file.name);
		console.log(folders);
		res.send('ok');
	});
}
