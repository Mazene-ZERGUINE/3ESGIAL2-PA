import { Model } from '../../enum/model.enum';

function countUserByEmail(): string {
	return `
		SELECT COUNT(*)
		FROM ${Model.clientUser}
		WHERE email = $1;
	`;
}

export const signInQuery = {
	countUserByEmail,
};
