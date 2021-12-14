import { getExercises, getWorkout, getExerciseTimeState } from './baseUtils';

describe('baseUtils', () => {
  test('getWorkout', () => {
    const exercises = getExercises();

    const workoutNone = getWorkout({
      weights: 'none',
      numCycles: 2,
    });
    expect(workoutNone.length).toEqual(2);
    expect(workoutNone.every(w => exercises.noWeights.includes(w))).toEqual(true);

    const workoutWith = getWorkout({
      weights: 'with',
      numCycles: 3,
    });
    expect(workoutWith.length).toEqual(3);
    expect(workoutWith.every((w) => exercises.withWeights.includes(w))).toEqual(true);
  });

  test('getExerciseTimeState', () => {
    const oneSet = 8 * 30;

    const timeStateOneSet = getExerciseTimeState(1, oneSet);
    expect(timeStateOneSet).toEqual({
      cycleIndex: 1,
      remainingSecondsRest: 0,
      remainingSecondsWork: 0,
      setIndex: 0,
    });

    const timeStateNull = getExerciseTimeState(1, oneSet + 1);
    expect(timeStateNull).toEqual(null);

    const timeStateOneSetRandom = getExerciseTimeState(4, 256);
    expect(timeStateOneSetRandom).toEqual({
      cycleIndex: 1,
      remainingSecondsRest: 0,
      remainingSecondsWork: 16,
      setIndex: 0,
    });
  });
});


