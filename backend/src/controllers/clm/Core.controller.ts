import { Request, Response } from 'express';

export abstract class CoreController {
	static readonly PAGE_SIZE = 20;

	static coreCreateWithoutTimestamps(model: any) {
		return async (req: Request, res: Response) => {
			try {
				await model.create({ ...req.body });
				res.status(201).end();
			} catch (error) {
				CoreController.handleError(error, res);
			}
		};
	}

	static coreCreateWithTimestamps(model: any) {
		return async (req: Request, res: Response) => {
			try {
				await model.create({ ...req.body, created_at: new Date(), update_at: null });
				res.status(201).end();
			} catch (error) {
				CoreController.handleError(error, res);
			}
		};
	}

	static coreDeleteById(model: any) {
		return async (req: Request, res: Response) => {
			try {
				const item = await model.findByPk(req.params.id);
				if (!item) {
					res.status(404).end();
					return;
				}

				await item.destroy();
				res.status(200).end();
			} catch (error) {
				CoreController.handleError(error, res);
			}
		};
	}

	static coreGetAll(model: any) {
		return async ({ query: { page } }: Request, res: Response) => {
			const providedPage = page ? Number(page) : 1;

			try {
				const items = await model.findAll({
					offset: (providedPage - 1) * CoreController.PAGE_SIZE,
					limit: CoreController.PAGE_SIZE,
					include: {
						all: true,
						nested: true,
					},
				});

				res.status(200).json({ data: items });
			} catch (error) {
				CoreController.handleError(error, res);
			}
		};
	}

	static coreGetOneByPk(model: any) {
		return async (req: Request, res: Response) => {
			try {
				const item = await model.findByPk(req.params.id, {
					include: { all: true },
				});
				if (!item) {
					res.status(404).end();
					return;
				}

				res.status(200).json({ data: item });
			} catch (error) {
				CoreController.handleError(error, res);
			}
		};
	}

	static coreUpdateByIdWithoutTimestamps(model: any) {
		return async (req: Request, res: Response) => {
			try {
				const item = await model.findByPk(req.params.id);
				if (!item) {
					res.status(404).end();
					return;
				}

				item.setAttributes({ ...req.body });
				await item.save();
				res.status(200).end();
			} catch (error) {
				CoreController.handleError(error, res);
			}
		};
	}

	static coreUpdateByIdWithTimestamps(model: any) {
		return async (req: Request, res: Response) => {
			try {
				const item = await model.findByPk(req.params.id);
				if (!item) {
					res.status(404).end();
					return;
				}

				item.setAttributes({ ...req.body, updated_at: new Date() });
				await item.save();
				res.status(200).end();
			} catch (error) {
				CoreController.handleError(error, res);
			}
		};
	}

	protected static handleError(error: any, res: Response) {
		console.error(error);
		res.status(500).json({ message: "Une erreur s'est produite. Réessayez plus tard." });
	}
}