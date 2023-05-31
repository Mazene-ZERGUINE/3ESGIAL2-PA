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

const getUserProjectsQuery: string = `SELECT * FROM categories_members WHERE id_member = $1 INNER JOIN categories_members
	ON id_project = id
	`;

module.exports = {
	getAllQuery,
	getOneQuery,
	deleteQuery,
	addNewCategoryQuery,
	updateQuery,
	addProjectsMumbers,
	getUserProjectsQuery,
};
