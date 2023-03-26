export function getOneById(model: string): string {
	return `
		SELECT *
		FROM ${model}
		WHERE id = $1
	`;
}

export function getMany(model: string): string {
	return `
		SELECT *
		FROM ${model}
	`;
}

export function createOne(model: string, columns: string[]): string {
	const columnsSeparatedByComma: string = columns.join(', ');
	const valuesSeparatedByComma: string = columns.map((_, index) => `$${index + 1}`).join(', ');

	return `
		INSERT INTO ${model} (${columnsSeparatedByComma})
		VALUES (${valuesSeparatedByComma})
	`;
}

export function updateOneById(model: string, columns: string[]): string {
	const valuesToSetSeparatedByComma: string = columns.map((column, index) => `${column} = $${index + 1}`).join(', ');

	return `
		UPDATE ${model}
		SET ${valuesToSetSeparatedByComma}
		WHERE id = $${columns.length + 1}
	`;
}

export function removeOneById(model: string): string {
	return `
		DELETE FROM ${model}
		WHERE id = $1
	`;
}
