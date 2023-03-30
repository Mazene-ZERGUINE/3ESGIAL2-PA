const insertQuery: string = ` INSERT INTO tasks(
	category_id,
	label ,
	description ,
	deadline ,
	created_at ,
	updated_at ,
	status,
	members
) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 ,$8 ) RETURNING taskId`;

const getOneByCategoryQuery: string = ` SELECT * FROM tasks WHERE category_id = $1 ORDER BY created_at`;

const deleteQuery: string = ` DELETE FROM tasks WHERE taskId = $1 `;

const updateStatusQuery: string = `UPDATE tasks SET status = $1 WHERE taskId = $2 `;

module.exports = {
	insertQuery,
	getOneByCategoryQuery,
	deleteQuery,
	updateStatusQuery,
};
