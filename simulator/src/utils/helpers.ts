import { Vec3 } from '../types';

export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
export const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
export const radToDeg = (rad: number) => (rad * 180) / Math.PI;
export const degToRad = (deg: number) => (deg * Math.PI) / 180;
export const distance3D = (v1: Vec3, v2: Vec3) => Math.sqrt(
  Math.pow(v1.x - v2.x, 2) + 
  Math.pow(v1.y - v2.y, 2) + 
  Math.pow(v1.z - v2.z, 2)
);
