import React from 'react';
import { JointAngles } from '../types';
import { radToDeg } from '../utils/helpers';

interface Props {
  angles: JointAngles;
  onClose: () => void;
}

const ExportPanel: React.FC<Props> = ({ angles, onClose }) => {
  const code = `
// Arduino Servo Code
servoBase.write(${Math.round(radToDeg(angles.base) + 90)});
servoShoulder.write(${Math.round(radToDeg(angles.shoulder) + 90)});
servoElbow.write(${Math.round(radToDeg(angles.elbow) + 90)});
servoWristPitch.write(${Math.round(radToDeg(angles.wristPitch) + 90)});
servoWristRoll.write(${Math.round(radToDeg(angles.wristRoll) + 90)});
servoGripper.write(${Math.round(angles.gripper * 180)});
  `.trim();

  return (
    <div className="hud-panel center-modal">
      <button className="btn close-btn" onClick={onClose}>X</button>
      <h3 className="title">Export to Firmware</h3>
      <textarea 
        readOnly 
        value={code} 
        rows={8}
        style={{ width: '100%', background: '#12121e', color: '#f1f5f9', border: '1px solid #2a2a3e', marginTop: 10 }}
      />
      <button className="btn" style={{ marginTop: 10 }} onClick={() => navigator.clipboard.writeText(code)}>
        Copy to Clipboard
      </button>
    </div>
  );
};

export default ExportPanel;
