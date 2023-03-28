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

const getOneByCategoryQuery: string = ` SELECT * FROM tasks WHERE category_id = $1 `;

module.exports = {
	insertQuery,
	getOneByCategoryQuery,
};
