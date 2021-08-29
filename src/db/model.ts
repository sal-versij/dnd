export class Address {
	id?: number;
	street: string;
	city: string;
	country: string;
}

export class Car {
	id?: number;
	brand: string;
	model: string;
}

export class Friend {
	id?: number;
	name: string;
	shoeSize: number;
	carsIds: [number];
	addressId: number;
}
