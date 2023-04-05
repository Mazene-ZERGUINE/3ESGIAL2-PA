function findUser(): string {
	return `
		SELECT COUNT(*)
		FROM client_user
		WHERE email = $1;
	`;
}

function findUserWithEmailAndPassword(): string {
	return `
		SELECT COUNT(*)
		FROM client_user
		WHERE email = $1
		AND password = $2;
	`;
}

export const signInQuery = {
	findUser,
	findUserWithEmailAndPassword,
};
