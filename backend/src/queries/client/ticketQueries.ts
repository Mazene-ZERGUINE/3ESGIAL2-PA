const createQuery: string = `INSERT INTO tickets (project_id, members ,status , description , tag , ticket_title)
														VALUES ($1 , '' , 'A FAIRE' , $2 , $4 , $3 )  `;

const getOneQuery: string = ` SELECT * FROM tickets WHERE project_id = $1`;

module.exports = {
	createQuery,
	getOneQuery,
};
