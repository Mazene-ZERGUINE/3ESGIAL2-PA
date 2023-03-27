DROP TABLE tasks ;
CREATE TABLE tasks (
	taskId SERIAL PRIMARY KEY ,
	label VARCHAR(60),
	category_id INTEGER ,
	description TEXT ,
	status VARCHAR (25) ,
	deadline Date ,
	created_at Date,
	updated_at Date
) ;


DROP TABLE memebers_tasks ;
CREATE TABLE memebers_tasks (
	id SERIAL PRIMARY KEY ,
	user_id INTEGER ,
	task_id INTEGER
) ;
