const getAllQuery: string = 'SELECT * FROM categories';
const getOneById: string = 'SELECT * FROM categories WHERE id = $1';

module.exports = {
	getAllQuery,
	getOneById,
};
