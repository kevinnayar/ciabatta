import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  getExerciseTimeState,
  ExerciseTimeState,
  playTick,
  playChange,
} from '../../utils/baseUtils';
import './screen.scss';

const ExerciseList = ({ workout }: { workout: string[] }) => {
  return (
    <ul className="card__list exercise">
      {workout.map((exercise) => (
        <li key={exercise}>
          <span role="img" aria-label="flexed arm">
            💪
          </span>{' '}
          {exercise}
        </li>
      ))}
    </ul>
  );
};

type PreviewScreenProps = {
  workout: string[];
  setSelectedWorkout: () => void;
};

const PreviewScreen = ({ workout, setSelectedWorkout }: PreviewScreenProps) => {
  const id = workout.map((w) => w).join();
  return (
    <div key={id} className="card card--previewer">
      <ExerciseList workout={workout} />
      <button className="card__button button button--start" onClick={setSelectedWorkout}>
        Start Workout
      </button>
    </div>
  );
};

type ActiveExerciseListProps = {
  workout: string[];
  timeState: null | ExerciseTimeState;
};

const ActiveExerciseList = ({ workout, timeState }: ActiveExerciseListProps) => {
  return (
    <ul className="card__list exercise">
      {workout.map((exercise, index) => {
        const isComplete = timeState ? timeState.cycleIndex > index : false;
        const isActive = timeState ? timeState.cycleIndex === index : false;

        let [emoji, emojiLabel] = isComplete ? ['✅', 'completed'] : ['🔴', 'incomplete'];
        if (isActive) {
          emoji = '💪';
          emojiLabel = 'active';
        }

        return (
          <li key={exercise}>
            <div
              className={`exercise__title ${isComplete ? 'complete' : ''} ${
                isActive ? 'active' : ''
              }`}
            >
              <i role="img" aria-label={emojiLabel}>
                {emoji}
              </i>
              <p>{exercise}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

type TimeStateProps = {
  timeState: null | ExerciseTimeState;
};

const TimeState = ({ timeState }: TimeStateProps) => {
  if (!timeState) {
    return <div className="time-state compelete">Workout completed!</div>;
  }

  const { cycleIndex, setIndex, remainingSecondsWork, remainingSecondsRest } = timeState;

  return (
    <div className="time-state active">
      <div className="time-state__cycle">
        <p className="key">Cycle</p>
        <p className="value">{cycleIndex + 1}</p>
      </div>
      <div className="time-state__set">
        <p className="key">Set</p>
        <p className="value">{setIndex + 1}</p>
      </div>
      <div className="time-state__times">
        <div className="time-state__times--work">
          <p className="key">Work</p>
          <p className="value">{remainingSecondsWork}</p>
        </div>
        <div className="time-state__times--rest">
          <p className="key">Rest</p>
          <p className="value">{remainingSecondsRest}</p>
        </div>
      </div>
    </div>
  );
};

type PlayerScreenProps = {
  workout: string[];
  unsetSelectedWorkout: () => void;
  playing: boolean;
  seconds: number;
  mute: boolean;
  numCycles: number;
};

const PlayerScreen = ({
  workout,
  unsetSelectedWorkout,
  playing,
  seconds,
  mute,
  numCycles,
}: PlayerScreenProps) => {
  const [timeState, setTimeState] = useState<null | ExerciseTimeState>(
    getExerciseTimeState(numCycles, seconds),
  );

  useEffect(() => {
    const newTimeState = getExerciseTimeState(numCycles, seconds);
    setTimeState(newTimeState);

    if (!mute) {
      if (
        newTimeState &&
        (newTimeState.remainingSecondsWork === 0 ||
          (newTimeState.remainingSecondsWork === 20 && newTimeState.remainingSecondsRest === 0))
      ) {
        playChange();
      }
      playTick();
    }
  }, [mute, playing, seconds, numCycles]);

  return (
    <div className="card card--player">
      <ActiveExerciseList workout={workout} timeState={timeState} />
      <TimeState timeState={timeState} />
      <button className="card__button button button--close" onClick={unsetSelectedWorkout}>
        <i className="material-icons">close</i>
      </button>
    </div>
  );
};

type ScreenProps = {
  playing: boolean;
  seconds: number;
  mute: boolean;
  numCycles: number,
  previewWorkout: string[];
  selectedWorkout: null | string[];
  setSelectedWorkout: () => void;
  unsetSelectedWorkout: () => void;
};

const Screen = ({
  playing,
  seconds,
  mute,
  numCycles,
  previewWorkout,
  selectedWorkout,
  setSelectedWorkout,
  unsetSelectedWorkout,
}: ScreenProps) => {
  return (
    <div className="screen">
      {selectedWorkout ? (
        <PlayerScreen
          workout={selectedWorkout}
          unsetSelectedWorkout={unsetSelectedWorkout}
          playing={playing}
          seconds={seconds}
          mute={mute}
          numCycles={numCycles}
        />
      ) : (
        <PreviewScreen workout={previewWorkout} setSelectedWorkout={setSelectedWorkout} />
      )}
    </div>
  );
};

export default Screen;


