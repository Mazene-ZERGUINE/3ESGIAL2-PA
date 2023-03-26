import { Router, Request, Response } from 'express';
const clientPool: any = require('../../db/clientPool');

const addNewTask = (req: Request, res: Response) => {
	res.json({ status: 'ok' });
};

module.exports = {
	addNewTask,
};
