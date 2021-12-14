type ExerciseMap = {
  noWeights: string[];
  withWeights: string[];
};

const EXERCISES: ExerciseMap = {
  noWeights: [
    'Bicycle Crunches',
    'Bodyweight Squats',
    'Bulgarian Split Squats',
    'Burpees',
    'Butt Kickers',
    'Calf Raises',
    'Crunches',
    'High Knees',
    'Jumping jacks',
    'Lunges',
    'Lying Leg Raises',
    'Mountain Climbers',
    'Plank Walkouts',
    'Push-ups',
    'Reverse Lunges',
    'Shoulder Tap Planks',
    'Side Planks',
    'Single Leg Glute Bridges',
    'Skater Squat',
    'Straight Arm Planks',
    'Table-top Rows',
    'Table-top Inverted Rows',
  ],
  withWeights: [
    'Squats with Overhead Press',
    'Hammer Curl with Power Squat',
    'Weighted Squats',
    'Dumbbell Rows',
    'Turkish Get-ups',
    'Rear Lunge with Double Arm Row',
    'Dumbbell Goblet Squat',
    'Single Arm Dumbbell Row',
    'One Arm Dumbbell Swing',
    'Renegade Row',
    'Dumbbell Russian Twist',
  ],
};

export function getExercises(): ExerciseMap {
  return {...EXERCISES};
}

export type WorkoutConfig = {
  weights: 'none' | 'with' | 'both';
  numCycles: 2 | 3 | 4 | 5;
};

export function getWorkout(config: WorkoutConfig): string[] {
  const { weights, numCycles } = config;
  const exercises = getExercises();

  let list: string[];
  switch (weights) {
    case 'none': {
      list = exercises.noWeights;
      break;
    }
    case 'with': {
      list = exercises.withWeights;
      break;
    }
    case 'both': {
      list = [...exercises.withWeights, ...exercises.noWeights];
      break;
    }
    default: // do nothing
  }

  const workout: Set<string> = new Set();

  while (workout.size < numCycles) {
    const index = Math.floor(Math.random() * list.length);
    const exercise = list[index];
    workout.add(exercise);
  }

  return [...workout.values()];
}

export type ExerciseTimeState = {
  cycleIndex: number; // 0 / 1 / 2 / 3
  setIndex: number; // 0 / 1 / 2 / 3
  remainingSecondsWork: number; // 0 ... 20
  remainingSecondsRest: number; // 0 ... 10
};

export function getExerciseTimeState(numCycles: number, seconds: number): null | ExerciseTimeState {
  const setTime = 30;
  const numSets = 8;

  const maxTime = setTime * numSets * numCycles;
  if (seconds > maxTime) return null;

  const cycleIndex = Math.floor(seconds / (setTime * numSets));
  const intervals = seconds / setTime;
  const setIndex = Math.floor(intervals) - (cycleIndex * numSets);
  const remainingSeconds = Math.round((intervals - Math.floor(intervals)) * setTime);
  const isRest = remainingSeconds > 20;
  const remainingSecondsWork = isRest ? 20 : remainingSeconds;
  const remainingSecondsRest = isRest ? remainingSeconds - 20 : 0;

  const timeState: ExerciseTimeState = {
    cycleIndex,
    setIndex,
    remainingSecondsWork,
    remainingSecondsRest,
  };

  return timeState;
}

function play(filePath: string) {
  const audio = new Audio(filePath);
  audio.play();
}

export function playTick() {
  play(
    'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-69838/zapsplat_multimedia_click_button_short_sharp_73510.mp3',
  );
}

export function playChange() {
  play(
    'https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-46416/zapsplat_multimedia_button_click_002_53863.mp3',
  );
}

export class WorkoutConfigStorage {
  storage: Storage;
  storageKey = '_CIABATTA_WORKOUT_CONFIG_KEY_';
  workoutConfig: WorkoutConfig = {
    weights: 'none',
    numCycles: 4,
  };

  constructor(storage: Storage) {
    this.storage = storage;
  }

  getLocalConfig(): WorkoutConfig {
    let config: WorkoutConfig = this.workoutConfig;
    const configMaybe: null | string = this.storage.getItem(this.storageKey);
    if (!configMaybe) return config;

    try {
      const asObject = JSON.parse(configMaybe) as WorkoutConfig;
      config = asObject;
    } catch (e) {
      // do nothing
    }

    this.setLocalConfig(config);
    return config;
  }

  setLocalConfig(config: WorkoutConfig) {
    const asString = JSON.stringify(config);
    this.storage.setItem(this.storageKey, asString);
  }
}

