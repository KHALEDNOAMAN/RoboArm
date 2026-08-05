import React from 'react';
import { JointAngles, Vec3 } from '../types';
import { Kinematics } from '../engine/Kinematics';

interface Props {
  angles: JointAngles;
  target: Vec3 | null;
}

const MathOverlay: React.FC<Props> = ({ angles, target }) => {
  const fkPos = Kinematics.forwardKinematics(angles);

  return (
    <div className="hud-panel right-panel">
      <h3 className="title">Kinematics Math</h3>
      
      <div className="math-section">
        <h4>Target Position (IK)</h4>
        {target ? (
          <div>
            <div className="math-eq">x: <span className="math-val">{target.x.toFixed(2)}</span></div>
            <div className="math-eq">y: <span className="math-val">{target.y.toFixed(2)}</span></div>
            <div className="math-eq">z: <span className="math-val">{target.z.toFixed(2)}</span></div>
          </div>
        ) : (
          <div className="muted">No target set. Click ground.</div>
        )}
      </div>

      <div className="math-section">
        <h4>Current Position (FK)</h4>
        <div className="math-eq">x: <span className="math-val">{fkPos.x.toFixed(2)}</span></div>
        <div className="math-eq">y: <span className="math-val">{fkPos.y.toFixed(2)}</span></div>
        <div className="math-eq">z: <span className="math-val">{fkPos.z.toFixed(2)}</span></div>
      </div>
      
      <div className="math-section">
        <h4>DH Parameters</h4>
        <div className="math-eq">T_0^6 = T_0^1 T_1^2 ... T_5^6</div>
      </div>
    </div>
  );
};

export default MathOverlay;
