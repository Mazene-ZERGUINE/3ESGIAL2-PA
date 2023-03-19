import { Router, Request, Response } from 'express';

const router: Router = Router();
const categoriesController: any = require('../../controllers/client/CategoryController');

router.get('/', categoriesController.getAllCategories);

module.exports = router;
