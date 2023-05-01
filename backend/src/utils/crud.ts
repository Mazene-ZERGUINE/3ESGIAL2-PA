/**
 * @deprecated ⚠️ We can use `getOneBy()` instead which is more generic.
 * @see getOneBy
 * @param model
 */
export function getOneById(model: string): string {
	return `
		SELECT *
		FROM ${model}
		WHERE id = $1
	`;
}

export function getOneBy(model: string, column: [string]): string {
	return `
		SELECT *
		FROM ${model}
		WHERE ${column} = $1
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

export function updateOneBy(model: string, columns: string[], constraint: [string]): string {
	const addToIndex = 1 + constraint.length;
	const valuesToSetSeparatedByComma: string = columns
		.map((column, index) => `${column} = $${index + addToIndex}`)
		.join(', ');

	return `
		UPDATE ${model}
		SET ${valuesToSetSeparatedByComma}
		WHERE ${constraint} = $1
	`;
}

export function removeOneById(model: string): string {
	return `
		DELETE FROM ${model}
		WHERE id = $1
	`;
}

export function removeOneBy(model: string, column: [string]): string {
	return `
		DELETE FROM ${model}
		WHERE ${column} = $1
	`;
}
