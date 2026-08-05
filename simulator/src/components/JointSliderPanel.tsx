import React from 'react';
import { JointAngles } from '../types';
import { radToDeg, degToRad } from '../utils/helpers';

interface Props {
  angles: JointAngles;
  onChange: (angles: JointAngles) => void;
}

const JointSliderPanel: React.FC<Props> = ({ angles, onChange }) => {
  const handleChange = (key: keyof JointAngles, value: number) => {
    onChange({ ...angles, [key]: value });
  };

  const sliders: { key: keyof JointAngles, label: string, min: number, max: number, color: string }[] = [
    { key: 'base', label: 'Base', min: -180, max: 180, color: '#64748b' },
    { key: 'shoulder', label: 'Shoulder', min: -90, max: 90, color: '#f97316' },
    { key: 'elbow', label: 'Elbow', min: -180, max: 0, color: '#eab308' },
    { key: 'wristPitch', label: 'Wrist Pitch', min: -90, max: 90, color: '#22c55e' },
    { key: 'wristRoll', label: 'Wrist Roll', min: -180, max: 180, color: '#22c55e' },
    { key: 'gripper', label: 'Gripper', min: 0, max: 1, color: '#ef4444' }
  ];

  return (
    <div className="hud-panel left-panel">
      <h2 className="title">Joint Controls</h2>
      <p className="muted">Direct FK Control</p>
      
      {sliders.map(s => (
        <div key={s.key} className="slider-group">
          <label style={{ color: s.color }}>
            {s.label}
            <span className="slider-value">
              {s.key === 'gripper' ? angles[s.key].toFixed(2) : radToDeg(angles[s.key]).toFixed(1)}°
            </span>
          </label>
          <input 
            type="range" 
            min={s.min} 
            max={s.max} 
            step={s.key === 'gripper' ? 0.01 : 1}
            value={s.key === 'gripper' ? angles[s.key] : radToDeg(angles[s.key])}
            onChange={(e) => handleChange(s.key, s.key === 'gripper' ? parseFloat(e.target.value) : degToRad(parseFloat(e.target.value)))}
          />
        </div>
      ))}
    </div>
  );
};

export default JointSliderPanel;
