import { title } from 'process';
import { argon2d, hash } from 'argon2';
import { ca, ta } from 'date-fns/locale';
import { Request, Response } from 'express';

const clientPool: any = require('../../db/clientPool');

export async function dbSync(req: Request, res: Response) {
	try {
		const users: any[] = req.body.users;
		const projects: any[] = req.body.projects;
		const tasks: any[] = req.body.tasks;
		console.log(tasks);
		// insert users
		if (users.length > 0) {
			const userInsertPromise = users.map(async (user) => {
				try {
					const { id, email, password, firstName, lastName, createdAt, role } = user;
					await clientPool.query(
						'INSERT INTO client_user (email, password, first_name, last_name, created_at, role) VALUES($1 , $2, $3, $4, $5, $6)',
						[email, await hash(password), firstName, lastName, createdAt, role],
					);
				} catch (error) {
					console.error(`Error inserting user with email ${user.email}:`, error);
				}
			});
			await Promise.all(userInsertPromise);
		}
		// insert projects

		if (projects.length > 0) {
			const insertProjectPromises = projects.map(async (project) => {
				try {
					console.log(project);
					const { title, discreption } = project;
					await clientPool.query('INSERT INTO categories (title, desciption) VALUES ($1, $2)', [title, discreption]);
				} catch (error) {
					console.error(`Error inserting project with title ${project.title}:`, error);
				}
			});
			await Promise.all(insertProjectPromises);

			const selectIdPromises = projects.map(async (project) => {
				try {
					const { title } = project;
					const result = await clientPool.query('SELECT * FROM categories WHERE title = $1', [title]);
					return result.rows[0]; // Get the ID or undefined if not found
				} catch (error) {
					console.error(`Error selecting project ID for title ${project.title}:`, error);
					return undefined;
				}
			});

			const selectedProjectIds = await Promise.all(selectIdPromises);

			for (const taskName in tasks) {
				const task = tasks[taskName];

				for (const project of selectedProjectIds) {
					if (project.title === taskName) {
						task.forEach((obj: any) => {
							obj.category_id = project.id;
						});
					}
				}
			}

			try {
				for (const taskName in tasks) {
					const task = tasks[taskName];

					for (const object of task) {
						const { id, members, startAt, status, label, deadline, created_at, description, category_id } = object;

						const query = `
          INSERT INTO tasks (start_at, status, label, deadline, created_at, description, category_id , members)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

						const values = [startAt, status, label, deadline, created_at, description, category_id, 'null'];

						await clientPool.query(query, values);
					}
				}
			} catch (err) {
				console.log(err);
			}
		}

		res.status(200).json('database has been synchronised with success');
	} catch (err) {
		console.error('Error inserting data:', err);
		res.status(500).json({ message: 'An error occurred while inserting data' });
	}
}
