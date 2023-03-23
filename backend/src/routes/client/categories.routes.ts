import { Router, Request, Response } from 'express';

const router: Router = Router();
const categoriesController: any = require('../../controllers/client/CategoryController');

router.get('/', categoriesController.getAllCategories);
router.get('/:id_category', categoriesController.getOneCategorieById);
router.post('/', categoriesController.addNewCategory);
router.delete('/:id_category', categoriesController.deleteCategory);
module.exports = router;
