DROP TABLE tickets ;
CREATE TABLE tickets (
	ticket_id SERIAL PRIMARY KEY ,
	project_id INTEGER ,
	members VARCHAR ,
	status VARCHAR ,
	description VARCHAR,
	tag VARCHAR ,
	ticket_title VARCHAR
) ;

