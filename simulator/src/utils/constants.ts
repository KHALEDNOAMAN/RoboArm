import { DHParams } from '../types';

export const DH_PARAMS: DHParams = {
  d: [10, 0, 0, 0, 0, 5],
  a: [0, 15, 10, 0, 0, 0],
  alpha: [Math.PI/2, 0, 0, Math.PI/2, -Math.PI/2, 0]
};

export const SEGMENTS = {
  base: { length: 2 },
  shoulder: { length: 4 },
  elbow: { length: 3 },
  wrist: { length: 1 }
};

export const DEFAULT_ANGLES = {
  base: 0,
  shoulder: Math.PI / 4,
  elbow: -Math.PI / 2,
  wristPitch: -Math.PI / 4,
  wristRoll: 0,
  gripper: 0
};

export const BLOCKS_DATA = [
  { id: 'b1', position: { x: 3, y: 0.5, z: 3 }, color: '#ef4444' },
  { id: 'b2', position: { x: -3, y: 0.5, z: 2 }, color: '#3b82f6' },
  { id: 'b3', position: { x: 2, y: 0.5, z: -3 }, color: '#22c55e' },
  { id: 'b4', position: { x: 4, y: 0.5, z: 0 }, color: '#eab308' }
];

export const BINS = [
  { id: 'bin_red', position: { x: -4, y: 0.5, z: -4 }, color: '#ef4444' },
  { id: 'bin_blue', position: { x: -2, y: 0.5, z: -4 }, color: '#3b82f6' },
  { id: 'bin_green', position: { x: 0, y: 0.5, z: -4 }, color: '#22c55e' }
];
