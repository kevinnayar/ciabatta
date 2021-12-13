import React from 'react';
import { ModalState } from '../Modal/Modal';
import './navigation.scss';

type PreviewNavProps = {
  setModalState: (s: ModalState) => void;
  shufflePreviewWorkout: () => void;
};

const PreviewNav = ({ setModalState, shufflePreviewWorkout }: PreviewNavProps) => {
  const setModalSettings = () => setModalState('settings');
  const setModalInfo = () => setModalState('info');

  return (
    <div className="actions">
      <button className="actions__button button button--secondary" onClick={setModalSettings}>
        <i className="material-icons">settings</i>
      </button>
      <button className="actions__button button button--primary" onClick={shufflePreviewWorkout}>
        <i className="material-icons">shuffle</i>
      </button>
      <button className="actions__button button button--secondary" onClick={setModalInfo}>
        <i className="material-icons">help</i>
      </button>
    </div>
  );
};

type PlayerScreenNavProps = {
  playing: boolean;
  mute: boolean;
  togglePlaying: () => void;
  resetPlaying: () => void;
  toggleMute: () => void;
};

const PlayerScreenNav = ({
  playing,
  mute,
  togglePlaying,
  resetPlaying,
  toggleMute,
}: PlayerScreenNavProps) => {
  const playPauseIcon = playing ? 'pause' : 'play_arrow';
  const muteUnmuteIcon = mute ? 'volume_up' : 'volume_off';

  return (
    <div className="actions">
      <button className="actions__button button button--secondary" onClick={resetPlaying}>
        <i className="material-icons">restart_alt</i>
      </button>
      <button className="actions__button button button--primary" onClick={togglePlaying}>
        <i className="material-icons">{playPauseIcon}</i>
      </button>
      <button className="actions__button button button--secondary" onClick={toggleMute}>
        <i className="material-icons">{muteUnmuteIcon}</i>
      </button>
    </div>
  );
};

type NavigationProps = {
  workoutSelected: boolean;
  playing: boolean;
  mute: boolean;
  shufflePreviewWorkout: () => void;
  togglePlaying: () => void;
  resetPlaying: () => void;
  toggleMute: () => void;
  setModalState: (s: ModalState) => void;
};

const Navigation = ({
  workoutSelected,
  playing,
  mute,
  shufflePreviewWorkout,
  togglePlaying,
  resetPlaying,
  toggleMute,
  setModalState,
}: NavigationProps) => {
  return (
    <div className="nav">
      {workoutSelected ? (
        <PlayerScreenNav
          playing={playing}
          togglePlaying={togglePlaying}
          mute={mute}
          resetPlaying={resetPlaying}
          toggleMute={toggleMute}
        />
      ) : (
        <PreviewNav
          setModalState={setModalState}
          shufflePreviewWorkout={shufflePreviewWorkout}
        />
      )}
    </div>
  );
};

export default Navigation;


