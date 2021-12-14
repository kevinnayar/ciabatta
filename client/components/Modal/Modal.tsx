import React from 'react';
import { WorkoutConfig } from '../../utils/baseUtils';
import './modal.scss';

type ModalContentSettingsProps = {
  workoutConfig: WorkoutConfig;
  setWorkoutConfig: (w: WorkoutConfig) => void;
};

const ModalContentSettings = ({ workoutConfig, setWorkoutConfig }: ModalContentSettingsProps) => {
  const weightTuples: Array<[string, string]> = [
    ['Yes', 'with'],
    ['No', 'none'],
    ['Mixed', 'both'],
  ];
  const setWeights = (id: string) => {
    setWorkoutConfig({
      ...workoutConfig,
      weights: id as 'none' | 'with' | 'both',
    });
  };

  const numCyclesOpts = [2, 3, 4, 5];
  const setNumCycles = (num: number) => {
    setWorkoutConfig({
      ...workoutConfig,
      numCycles: num as 2 | 3 | 4 | 5,
    });
  };

  return (
    <div className="modal__content settings">
      <h2>Exercises with weights?</h2>
      <div className="settings-options">
        {weightTuples.map(([text, id]) => (
          <div className="settings-options__item" key={id} onClick={() => setWeights(id)}>
            <i className="material-icons">
              {workoutConfig.weights === id ? 'radio_button_checked' : 'radio_button_unchecked'}
            </i>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <h2>How many cycles?</h2>
      <div className="settings-options">
        {numCyclesOpts.map((num) => (
          <div className="settings-options__item" key={num} onClick={() => setNumCycles(num)}>
            <i className="material-icons">
              {workoutConfig.numCycles === num ? 'radio_button_checked' : 'radio_button_unchecked'}
            </i>
            <p>{num}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ModalContentInfo = () => {
  return (
    <div className="modal__content info">
      <h2>What is Ciabatta?</h2>
      <p>
        It&apos;s an homage to one of my favorite types of bread (one of many!) and my archnemesis in my
        never-ending quest to get fit. But really, it&apos;s a terrible way to say{' '}
        <strong>Tabata!</strong>
      </p>
      <h2>Okay, so what is Tabata?!</h2>
      <p>
        Glad you asked. Tabata is a specific exercise protocol developed by a researcher named
        Izumi Tabata in Tokyo in 1996. He found that athletes who performed these extra-intense,
        four-minute interval workouts five days per week for six weeks increased their anaerobic
        capacity, their oxygen intake during exercise, and experienced great metabolic boosts.
        In short, it&apos;s a super efficient workout that you can crush in just <strong>16 minutes</strong>!
      </p>
      <h2>Neat. How does it work?</h2>
      <p>
        You do 4 exercises for 4 minutes each, so the workout lasts a grand total of... wait for
        it... <strong>16 minutes</strong>! Each of the cycles of 4 minutes is split into intervals
        of 20 seconds ON and 10 seconds OFF. So, you do as many reps as possible in 20 seconds and
        then rest for 10 seconds before continuing on to the next move. Do this 8 times for one
        exercise before moving on to the next one.
      </p>
      <p>Okay, enough questions. <strong>Now, get to work!!</strong></p>
    </div>
  );
};

export type ModalState = null | 'settings' | 'info';

type ModalProps = {
  modalState: ModalState;
  setModalState: (s: ModalState) => void;
  workoutConfig: WorkoutConfig;
  setWorkoutConfig: (w: WorkoutConfig) => void;
};

const Modal = ({ modalState, setModalState, workoutConfig, setWorkoutConfig }: ModalProps) => {
  return (
    <div className={`modal ${modalState ? 'visible' : 'hidden'}`}>
      {modalState === 'info' && <ModalContentInfo />}
      {modalState === 'settings' && (
        <ModalContentSettings workoutConfig={workoutConfig} setWorkoutConfig={setWorkoutConfig} />
      )}
      <div className="modal__action">
        <button className="button" onClick={() => setModalState(null)}>
          <i className="material-icons">close</i>
        </button>
      </div>
    </div>
  );
};

export default Modal;





