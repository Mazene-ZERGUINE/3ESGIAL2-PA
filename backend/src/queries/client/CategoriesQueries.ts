import { getOneById } from '../../utils/crud';
import { getMany } from '../../utils/crud';
import { removeOneById } from '../../utils/crud';
import { createOne } from '../../utils/crud';

const getAllQuery: string = getMany('categories');
const getOneQuery: string = getOneById('categories');
const deleteQuery: string = removeOneById('categories');

const addNewCategoryQuery: string = 'INSERT INTO categories (title , desciption) VALUES ($1 , $2) RETURNING id';

const updateQuery = 'UPDATE categories SET title = $1, desciption = $2 WHERE id = $3';

const addProjectsMumbers: string = 'INSERT INTO categories_members (id_project , id_member) VALUES($1 , $2)';

const getUserProjectsQuery: string = `
SELECT c.id AS category_id, u.id AS user_id, c.*, u.*
FROM categories_members cm
JOIN categories c ON cm.id_project = c.id
JOIN client_user u ON cm.id_member = u.id
WHERE u.id = $1;
`;

const allProjectQuery: string = `
SELECT c.*, u.*
FROM categories_members cm
JOIN categories c ON cm.id_project = c.id
JOIN client_user u ON cm.id_member = u.id
WHERE c.id = $1
`;

module.exports = {
	getAllQuery,
	getOneQuery,
	deleteQuery,
	addNewCategoryQuery,
	updateQuery,
	addProjectsMumbers,
	getUserProjectsQuery,
	allProjectQuery,
};
