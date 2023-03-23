const getAllQuery: string = 'SELECT * FROM categories';
const getOneById: string = 'SELECT * FROM categories WHERE id = $1';
const deleteQuery: string = 'DELETE FROM categories WHERE id = $1';

const addNewCategoryQuery: string = 'INSERT INTO categories (title , desciption) VALUES ($1 , $2)';

module.exports = {
	getAllQuery,
	getOneById,
	deleteQuery,
	addNewCategoryQuery,
};
