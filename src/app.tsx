import * as React from 'react';
import { useState, useEffect } from 'react';
import { getWorkout, WorkoutConfig, WorkoutConfigStorage } from './utils/baseUtils';

import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Screen from './components/Screen/Screen';
import Modal, { ModalState } from './components/Modal/Modal';

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(true);
  const [modalState, setModalState] = useState<ModalState>(null);

  const workoutConfigStorage = new WorkoutConfigStorage(window.localStorage);
  const [workoutConfig, setWorkoutConfig] = useState<WorkoutConfig>(workoutConfigStorage.getLocalConfig());

  const [previewWorkout, setPreviewWorkout] = useState<string[]>(getWorkout(workoutConfig));
  const [selectedWorkout, setSelectedWorkout] = useState<null | string[]>(null);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  const resetPlaying = () => {
    setSeconds(0);
    setPlaying(false);
  };

  const toggleMute = () => {
    setMute(!mute);
  };

  const shufflePreviewWorkout = () => {
    setPreviewWorkout(getWorkout(workoutConfig));
  };

  const onSetWorkoutConfig = (config: WorkoutConfig) => {
    setWorkoutConfig(config);
    workoutConfigStorage.setLocalConfig(config);
    setPreviewWorkout(getWorkout(config));
  };

  const onSetSelectedWorkout = () => {
    setSelectedWorkout(previewWorkout);
  };

  const onUnsetSelectedWorkout = () => {
    resetPlaying();
    setSelectedWorkout(null);
  };

  useEffect(() => {
    let interval: any = null;

    if (playing) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
    } else if (!playing && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing, seconds]);

  return (
    <div className="app">
      <Header />
      <Screen
        seconds={seconds}
        playing={playing}
        mute={mute}
        numCycles={workoutConfig.numCycles}
        previewWorkout={previewWorkout}
        selectedWorkout={selectedWorkout}
        setSelectedWorkout={onSetSelectedWorkout}
        unsetSelectedWorkout={onUnsetSelectedWorkout}
      />
      <Navigation
        workoutSelected={!!selectedWorkout}
        playing={playing}
        mute={mute}
        shufflePreviewWorkout={shufflePreviewWorkout}
        togglePlaying={togglePlaying}
        resetPlaying={resetPlaying}
        toggleMute={toggleMute}
        setModalState={setModalState}
      />
      <Modal
        modalState={modalState}
        setModalState={setModalState}
        workoutConfig={workoutConfig}
        setWorkoutConfig={onSetWorkoutConfig}
      />
    </div>
  );
}


