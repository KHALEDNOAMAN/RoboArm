import { JointAngles, Vec3, DHParams } from '../types';
import { DH_PARAMS, SEGMENTS } from '../utils/constants';

export class Kinematics {
  static forwardKinematics(angles: JointAngles): Vec3 {
    const baseHeight = SEGMENTS.base.length;
    const l1 = SEGMENTS.shoulder.length;
    const l2 = SEGMENTS.elbow.length;
    const l3 = SEGMENTS.wrist.length;

    const r1 = l1 * Math.cos(angles.shoulder);
    const z1 = baseHeight + l1 * Math.sin(angles.shoulder);

    const r2 = r1 + l2 * Math.cos(angles.shoulder + angles.elbow);
    const z2 = z1 + l2 * Math.sin(angles.shoulder + angles.elbow);

    const r3 = r2 + l3 * Math.cos(angles.shoulder + angles.elbow + angles.wristPitch);
    const z3 = z2 + l3 * Math.sin(angles.shoulder + angles.elbow + angles.wristPitch);

    const x = r3 * Math.cos(angles.base);
    const y = z3;
    const z = r3 * Math.sin(angles.base);

    return { x, y, z };
  }

  static inverseKinematics(target: Vec3, wristPitch: number = 0): JointAngles | null {
    const l1 = SEGMENTS.shoulder.length;
    const l2 = SEGMENTS.elbow.length;
    const l3 = SEGMENTS.wrist.length;

    const baseAngle = Math.atan2(target.z, target.x);
    
    const r = Math.sqrt(target.x * target.x + target.z * target.z);
    
    const rw = r - l3 * Math.cos(wristPitch);
    const zw = target.y - SEGMENTS.base.length - l3 * Math.sin(wristPitch);
    
    const d = Math.sqrt(rw * rw + zw * zw);
    
    if (d > l1 + l2) return null;
    
    const alpha = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d));
    const beta = Math.acos((l1 * l1 + l2 * l2 - d * d) / (2 * l1 * l2));
    
    const theta1 = Math.atan2(zw, rw) + alpha;
    const theta2 = beta - Math.PI;
    
    return {
      base: baseAngle,
      shoulder: theta1,
      elbow: theta2,
      wristPitch: wristPitch - theta1 - theta2,
      wristRoll: 0,
      gripper: 0
    };
  }

  static isReachable(target: Vec3): boolean {
    return this.inverseKinematics(target) !== null;
  }

  static getJointPositions(angles: JointAngles): Vec3[] {
    const pts: Vec3[] = [];
    const baseHeight = SEGMENTS.base.length;
    const l1 = SEGMENTS.shoulder.length;
    const l2 = SEGMENTS.elbow.length;
    const l3 = SEGMENTS.wrist.length;
    
    pts.push({x: 0, y: 0, z: 0});
    pts.push({x: 0, y: baseHeight, z: 0});
    
    const r1 = l1 * Math.cos(angles.shoulder);
    const y1 = baseHeight + l1 * Math.sin(angles.shoulder);
    pts.push({x: r1 * Math.cos(angles.base), y: y1, z: r1 * Math.sin(angles.base)});
    
    const r2 = r1 + l2 * Math.cos(angles.shoulder + angles.elbow);
    const y2 = y1 + l2 * Math.sin(angles.shoulder + angles.elbow);
    pts.push({x: r2 * Math.cos(angles.base), y: y2, z: r2 * Math.sin(angles.base)});
    
    const r3 = r2 + l3 * Math.cos(angles.shoulder + angles.elbow + angles.wristPitch);
    const y3 = y2 + l3 * Math.sin(angles.shoulder + angles.elbow + angles.wristPitch);
    pts.push({x: r3 * Math.cos(angles.base), y: y3, z: r3 * Math.sin(angles.base)});
    
    return pts;
  }
}
