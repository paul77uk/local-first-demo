<script lang="ts">
	import type { Exercise } from './db.js';
	import { db } from './db.js';

	let { workoutId } = $props();
	let exercisesbyWorkoutId: Exercise[] = $state([]);
	let exerciseName = $state('');

	const getAllExercisesByWorkoutId = async () => {
		const allExercisesByWorkoutId = await db.exercises.where({ workoutId }).toArray();
		console.log(allExercisesByWorkoutId);
		exercisesbyWorkoutId = allExercisesByWorkoutId;
	};

	const saveExercise = async (workoutId: number) => {
		await db.exercises.add({
			title: exerciseName,
			workoutId
		});
		exerciseName = '';
		getAllExercisesByWorkoutId();
	};

	const deleteExercise = async (exercise: Exercise) => {
		await db.exercises.delete(exercise.id);
		getAllExercisesByWorkoutId();
	};

	$effect(() => {
		getAllExercisesByWorkoutId();
	});
</script>

<!-- Add exercises form -->
<input type="text" placeholder="Enter exercise name" bind:value={exerciseName} />
<button
	class="rounded border p-1 hover:bg-gray-50"
	onclick={() => workoutId !== undefined && saveExercise(workoutId)}>Submit</button
>

<ul>
	{#each exercisesbyWorkoutId as exercise (exercise.id)}
		<div class="flex gap-2 items-center my-3">
			<li>{exercise.title}</li>
			<li>{exercise.workoutId}</li>
			<button onclick={() => deleteExercise(exercise)} class="rounded border p-1 hover:bg-gray-50"
				>delete</button
			>
		</div>
	{/each}
	<hr>
</ul>
