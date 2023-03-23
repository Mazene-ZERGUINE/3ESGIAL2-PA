export default class Category {
	id!: number;
	title!: string;
	desciption!: string;

	get getDesciption(): string {
		return this.desciption;
	}

	get getTitle(): string {
		return this.title;
	}

	set setTitle(title: string) {
		this.title = title;
	}

	get getId(): number {
		return this.id;
	}
}
