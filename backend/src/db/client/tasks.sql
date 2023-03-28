
SELECT * FROM tasks;


DROP TABLE tasks ;
CREATE TABLE tasks (
	taskId SERIAL PRIMARY KEY ,
	label VARCHAR(60),
	category_id INTEGER ,
	description TEXT ,
	status VARCHAR (25) ,
	deadline Date ,
	created_at Date,
	updated_at Date,
	members TEXT
) ;


