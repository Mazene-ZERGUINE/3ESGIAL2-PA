import { Router, Request, Response } from 'express';

const router: Router = Router();
const ticketController: any = require('../../controllers/client/TicketsController');

router.post('/', ticketController.createTicket);
router.get('/:ticket_id', ticketController.getOneTicket);

module.exports = router;
