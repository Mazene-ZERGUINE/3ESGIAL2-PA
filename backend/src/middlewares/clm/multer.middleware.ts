import multer from 'multer';
import { Request } from 'express';

const MIME_TYPES: { [key: string]: string } = {
	'image/bmp': 'bmp',
	'image/jpg': 'jpg',
	'image/jpeg': 'jpeg',
	'image/png': 'png',
} as const;

const storage = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb: (err: null | Error, dest: string) => void) => {
		cb(null, './uploads/publications/images');
	},
	filename: (req: Request, file: Express.Multer.File, cb: (err: null | Error, dest: string) => void) => {
		const name: string = file.originalname.trim().split(' ').join('');
		const prefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

		cb(null, `${prefix}-${name}`);
	},
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	!(file.mimetype in MIME_TYPES)
		? cb(new Error("Les formats d'image doivent être au format : bmp, jpg, jpeg, png."))
		: cb(null, true);
};

export const multerConfig = multer({
	storage,
	// limits: { fileSize: 300000 }, // bytes
	fileFilter,
});
