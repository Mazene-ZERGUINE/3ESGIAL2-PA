const insertQuery: string = ` INSERT INTO tasks(
	category_id,
	label ,
	description ,
	deadline ,
	created_at ,
	updated_at ,
	status
) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 ) RETURNING taskId`;

const insertMemebersQuery: string = ` INSERT INTO memebers_tasks(
	user_id ,
	task_id) VALUES ($1 , $2)

`;

const getOneByCategoryQuery: string = ` SELECT * FROM tasks WHERE category_id = $1 `;

module.exports = {
	insertQuery,
	insertMemebersQuery,
	getOneByCategoryQuery,
};
