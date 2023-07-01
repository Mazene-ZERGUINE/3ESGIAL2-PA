import { Router } from 'express';

import { CategorieController } from '../../controllers/clm/Categorie.controller';
import { Categorie } from '../../models/clm/categorie';
import { isAdministrator, isAuthenticated } from '../../middlewares/clm/auth.middleware';

const router = Router();
router
	.get('/', [isAuthenticated], CategorieController.coreGetAllWithoutInclude(Categorie, 'categorie'))
	.get('/count', [isAuthenticated], CategorieController.coreCount(Categorie))
	.get('/:id', CategorieController.coreGetOneByPk(Categorie))
	.post('/', [isAuthenticated, isAdministrator], CategorieController.coreCreateWithoutTimestamps(Categorie))
	.put('/:id', [isAuthenticated, isAdministrator], CategorieController.coreUpdateByIdWithoutTimestamps(Categorie))
	.delete('/:id', [isAuthenticated, isAdministrator], CategorieController.coreDeleteById(Categorie));

export default router;
