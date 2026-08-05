import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { JointAngles, GameState, BlockState, Vec3 } from './types';
import { DEFAULT_ANGLES, BLOCKS_DATA } from './utils/constants';
import GameScene from './components/GameScene';
import RobotArmModel from './components/RobotArmModel';
import JointSliderPanel from './components/JointSliderPanel';
import ScorePanel from './components/ScorePanel';
import MathOverlay from './components/MathOverlay';
import ControlsHelp from './components/ControlsHelp';
import ExportPanel from './components/ExportPanel';
import { Kinematics } from './engine/Kinematics';
import { TrajectoryPlanner } from './engine/TrajectoryPlanner';

const App = () => {
  const [jointAngles, setJointAngles] = useState<JointAngles>(DEFAULT_ANGLES);
  const [targetPos, setTargetPos] = useState<Vec3 | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    mode: 'free', score: 0, blocksPlaced: 0, timeLeft: 60, showMath: false
  });
  const [blocks, setBlocks] = useState<BlockState[]>(
    BLOCKS_DATA.map(b => ({ ...b, isHeld: false, isPlaced: false }))
  );
  const [showExport, setShowExport] = useState(false);
  const planner = useRef(new TrajectoryPlanner());
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') setJointAngles(DEFAULT_ANGLES);
      if (e.key === 't' || e.key === 'T') setGameState(s => ({ ...s, showMath: !s.showMath }));
      if (e.key === 'e' || e.key === 'E') setShowExport(true);
      if (e.key === 'g' || e.key === 'G') setJointAngles(a => ({ ...a, gripper: a.gripper > 0.5 ? 0 : 1 }));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleGroundClick = (pos: Vec3) => {
    setTargetPos(pos);
    const newAngles = Kinematics.inverseKinematics({ x: pos.x, y: Math.max(0.5, pos.y), z: pos.z });
    if (newAngles) {
      planner.current.moveTo(newAngles, 1000);
      setJointAngles(newAngles);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
        <color attach="background" args={['#0a0a12']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} castShadow intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <GameScene blocks={blocks} onGroundClick={handleGroundClick} targetPos={targetPos} />
        <RobotArmModel angles={jointAngles} />
        
        <OrbitControls makeDefault />
        <Environment preset="city" />
      </Canvas>

      <JointSliderPanel angles={jointAngles} onChange={setJointAngles} />
      <ScorePanel state={gameState} />
      {gameState.showMath && <MathOverlay angles={jointAngles} target={targetPos} />}
      <ControlsHelp />
      {showExport && <ExportPanel angles={jointAngles} onClose={() => setShowExport(false)} />}
    </div>
  );
};

export default App;
