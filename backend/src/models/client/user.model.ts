export interface User {
	id: number;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	createdAt: number;
	updatedAt?: number;
}
