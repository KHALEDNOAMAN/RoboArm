import React from 'react';

const ControlsHelp = () => (
  <div className="hud-panel bottom-left-panel">
    <h4 className="title" style={{ margin: '0 0 10px 0' }}>Controls</h4>
    <ul style={{ margin: 0, paddingLeft: 20, fontSize: '0.85em' }}>
      <li>Click Ground - Move Arm (IK)</li>
      <li>G - Toggle Gripper</li>
      <li>Space - Pick/Place Block</li>
      <li>R - Reset Position</li>
      <li>T - Toggle Math Overlay</li>
      <li>E - Export Code</li>
      <li>Drag - Rotate Camera</li>
    </ul>
  </div>
);

export default ControlsHelp;
