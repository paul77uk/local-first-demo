<script lang="ts">
	import { db, type Workout } from './db';
	import ExercisesByWorkoutId from './ExercisesByWorkoutId.svelte';

	let workoutName = $state('');
	let workoutDescription = $state('');
	let workouts: Workout[] = $state([]);

	const save = async () => {
		await db.workouts.add({
			title: workoutName,
			description: workoutDescription
		});
		workoutName = '';
		workoutDescription = '';
		getAllWorkouts();
	};

	const getAllWorkouts = async () => {
		const allWorkouts = await db.workouts.toArray();
		workouts = allWorkouts;
	};

	const deleteWorkout = async (workout: Workout) => {
		await db.workouts.delete(workout.id);
		getAllWorkouts();
	};

	$effect(() => {
		getAllWorkouts();
	});
</script>

<h1>Workout</h1>

<!-- Add workout form -->
<input type="text" placeholder="Enter workout name" bind:value={workoutName} />
<input type="text" placeholder="Enter workout description" bind:value={workoutDescription} />
<button class="rounded border p-1 hover:bg-gray-50" onclick={save}>Submit</button>

<div>{workoutName}</div>
<div>{workoutDescription}</div>

<ul>
	{#each workouts as workout (workout.id)}
		<li class="my-2 flex items-center gap-2 text-lg">
			<div class="font-semibold">{workout.title}</div>
			{workout.description}
			{workout.id}
			<button onclick={() => deleteWorkout(workout)} class="rounded border p-1 hover:bg-gray-50"
				>delete</button
			>
		</li>
		<div>Exercises</div>

		<ExercisesByWorkoutId workoutId={workout.id} />
	{/each}
</ul>
