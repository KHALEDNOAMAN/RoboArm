import React from 'react';
import { GameState } from '../types';

interface Props {
  state: GameState;
}

const ScorePanel: React.FC<Props> = ({ state }) => {
  return (
    <div className="hud-panel top-center-panel">
      <h2 className="title" style={{ display: 'inline', marginRight: 20 }}>RoboArm</h2>
      <span className="muted">Mode: {state.mode.toUpperCase()}</span>
      <div style={{ marginTop: 10 }}>
        <span style={{ marginRight: 15 }}>Score: {state.score}</span>
        <span>Placed: {state.blocksPlaced}/4</span>
      </div>
    </div>
  );
};

export default ScorePanel;
