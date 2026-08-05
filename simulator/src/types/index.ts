export interface JointAngles {
  base: number;
  shoulder: number;
  elbow: number;
  wristPitch: number;
  wristRoll: number;
  gripper: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface ArmSegment {
  length: number;
  angle: number;
  axis: string;
}

export interface BlockState {
  id: string;
  position: Vec3;
  color: string;
  isHeld: boolean;
  isPlaced: boolean;
}

export interface GameState {
  mode: 'free' | 'sort' | 'stack';
  score: number;
  blocksPlaced: number;
  timeLeft: number;
  showMath: boolean;
}

export interface DHParams {
  d: number[];
  a: number[];
  alpha: number[];
}
