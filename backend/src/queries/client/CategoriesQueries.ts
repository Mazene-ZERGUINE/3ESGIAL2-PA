import { getOneById } from '../../utils/crud';
import { getMany } from '../../utils/crud';
import { removeOneById } from '../../utils/crud';
import { createOne } from '../../utils/crud';

const getAllQuery: string = getMany('categories');
const getOneQuery: string = getOneById('categories');
const deleteQuery: string = removeOneById('categories');

const addNewCategoryQuery: string = 'INSERT INTO categories (title , desciption) VALUES ($1 , $2)';

const updateQuery = 'UPDATE categories SET title = $1, desciption = $2 WHERE id = $3';

module.exports = {
	getAllQuery,
	getOneQuery,
	deleteQuery,
	addNewCategoryQuery,
	updateQuery,
};
