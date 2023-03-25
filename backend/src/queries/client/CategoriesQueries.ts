const getAllQuery: string = 'SELECT * FROM categories';
const getOneById: string = 'SELECT * FROM categories WHERE id = $1';
const deleteQuery: string = 'DELETE FROM categories WHERE id = $1';

const addNewCategoryQuery: string = 'INSERT INTO categories (title , desciption) VALUES ($1 , $2)';

const updateQuery = 'UPDATE categories SET title = $1, desciption = $2 WHERE id = $3';

module.exports = {
	getAllQuery,
	getOneById,
	deleteQuery,
	addNewCategoryQuery,
	updateQuery,
};
