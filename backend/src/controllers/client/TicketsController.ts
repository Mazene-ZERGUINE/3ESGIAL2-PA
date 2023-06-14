import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
const clientPool: any = require('../../db/clientPool');

const ticketQueries: any = require('../../queries/client/ticketQueries');

const createTicket = async (req: Request, res: Response): Promise<void> => {
	const { project_id, description, tag, ticket_title } = req.body;

	await clientPool.query(
		ticketQueries.createQuery,
		[project_id, description, ticket_title, tag],
		(error: Error, results: any) => {
			if (error) {
				res.status(501).json({
					error: 'Erreur serveur interne.',
					details: error,
				});
				console.log(error);
				return;
			}
			return res.status(200).send({ status_code: 200, message: 'Ticket créée avec succès.' });
		},
	);
};

const getOneTicket = async (req: Request, res: Response): Promise<void> => {
	const ticketId = req.params.ticket_id;

	clientPool.query(ticketQueries.getOneQuery, [ticketId], (error: Error, results: any) => {
		if (error) {
			res.status(501).json({
				error: 'Erreur serveur interne.',
				details: error,
			});
			console.log(error);
			return;
		}
		return res.status(200).send({ status_code: 200, tickets: results.rows });
	});
};

module.exports = {
	createTicket,
	getOneTicket,
};
