import multer from 'multer';
import { Request } from 'express';

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

export const multerConfig = multer({
	storage,
});
