import Dexie from 'dexie';
import type { Car, Address, Friend } from './model';

export default class DbCtx extends Dexie {
	cars: Dexie.Table<Car, number>;
	addresses: Dexie.Table<Address, number>;
	friends: Dexie.Table<Friend, number>;

	constructor(databaseName: string) {
		super(databaseName);
		this.migrate();
		this.referenceAndMapTables();
		this.open();
	}

	private migrate() {
		this.version(1).stores({
			cars: '++id,city',
			addresses: '++id,model,brand',
			friends: '++id,name,addressId',
		});
		this.on('populate', () => {
			// this.friends.add(new Friend());
		});
	}

	private referenceAndMapTables() {
		this.cars = this.table('cars');
		this.addresses = this.table('addresses');
		this.friends = this.table('friends');
	}

	ready(): Promise<DbCtx> {
		return new Promise((s, f) => {
			this.on('ready', () => s(this));
		});
	}
}
