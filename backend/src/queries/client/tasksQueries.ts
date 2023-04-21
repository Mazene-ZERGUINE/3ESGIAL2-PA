const insertQuery: string = ` INSERT INTO tasks(
	category_id,
	label ,
	description ,
	deadline ,
	created_at ,
	updated_at ,
	status,
	members,
	start_at
) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 ,$8 , $9) RETURNING taskId`;

const getOneByCategoryQuery: string = ` SELECT * FROM tasks WHERE category_id = $1 ORDER BY start_at`;

const deleteQuery: string = ` DELETE FROM tasks WHERE taskId = $1 `;

const updateStatusQuery: string = `UPDATE tasks SET status = $1 WHERE taskId = $2 `;

const getOneTaskByIdQuery: string = `SELECT * FROM tasks WHERE taskId = $1`;

const updateQuery: string = ` UPDATE tasks SET
label = $1 ,
description = $2 ,
status = $3 ,
deadline = $4 ,
members = $5,
updated_at = $6
WHERE taskId = $7
`;

module.exports = {
	insertQuery,
	getOneByCategoryQuery,
	deleteQuery,
	updateStatusQuery,
	getOneTaskByIdQuery,
	updateQuery,
};
