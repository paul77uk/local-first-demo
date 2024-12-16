import Dexie, { type EntityTable } from 'dexie';

export type Workout = {
	id?: number;
	title: string;
	description: string;
};

export type Exercise = {
	id?: number;
	title: string;
	workoutId: number;
};

const db = new Dexie('built4lifedb') as Dexie & {
	workouts: EntityTable<Workout, 'id'>;
	exercises: EntityTable<Exercise, 'id'>;
};

db.version(1).stores({
	workouts: '++id, title, description',
	exercises: '++id, title, workoutId'
});

export { db };
