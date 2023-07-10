import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
const clientPool: any = require('../../db/clientPool');

const ticketQueries: any = require('../../queries/client/ticketQueries');

const createTicket = async (req: Request, res: Response): Promise<void> => {
	const { project_id, ticket_title, tag, description, author, status, members } = req.body;

	await clientPool.query(
		ticketQueries.createQuery,
		[project_id, ticket_title, tag, description, author, status, members],
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

const deleteTicket = async (req: Request, res: Response): Promise<void> => {
	const ticketId = req.params.ticket_id;

	clientPool.query('DELETE FROM tickets WHERE ticket_id = $1', [ticketId], async (error: Error, results: any) => {
		if (error) {
			res.status(501).json({
				error: 'Erreur serveur interne.',
				details: error,
			});
			console.log(error);
			return;
		}
		return res.status(200).send({ status_code: 200, message: 'ticket deleted' });
	});
};

const updateTicket = (req: Request, res: Response): void => {
	const ticketId: number = parseInt(req.params.ticket_id);
	const { ticket_title, tag, description, status, members } = req.body;
	var membersString: string = '';
	members.map((member: string) => (membersString += member + '\n'));
	clientPool.query(
		'UPDATE tickets SET ticket_title = $1, tag = $2, description= $3 , status = $4 ,members = $5 WHERE ticket_id = $6 ',
		[ticket_title, tag, description, status, membersString, ticketId],
		(error: Error, results: any): void => {
			if (error) {
				res.status(501).send({
					error: 'Erreur serveur interne..',
					details: error,
				});
				throw error;
			}
			res.status(200).send({ status_code: 200, message: 'Ticket mise à jour.' });
		},
	);
};

module.exports = {
	createTicket,
	getOneTicket,
	deleteTicket,
	updateTicket,
};
