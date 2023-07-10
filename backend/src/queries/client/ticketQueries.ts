const createQuery: string = `INSERT INTO tickets (project_id, ticket_title ,tag , description , author , status, members)
														VALUES ($1, $2, $3, $4, $5, $6, $7)  `;

const getOneQuery: string = ` SELECT * FROM tickets WHERE project_id = $1`;

module.exports = {
	createQuery,
	getOneQuery,
};
