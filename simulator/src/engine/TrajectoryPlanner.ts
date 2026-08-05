import { JointAngles } from '../types';

export class TrajectoryPlanner {
  private start: JointAngles | null = null;
  private end: JointAngles | null = null;
  private startTime: number = 0;
  private duration: number = 0;

  moveTo(target: JointAngles, duration: number) {
    this.start = this.end ? { ...this.end } : null; 
    this.end = { ...target };
    this.startTime = performance.now();
    this.duration = duration;
  }

  update(currentAngles: JointAngles): JointAngles {
    if (!this.start || !this.end) return currentAngles;
    
    const now = performance.now();
    let t = (now - this.startTime) / this.duration;
    
    if (t >= 1) {
      t = 1;
      const finalAngles = { ...this.end };
      this.start = null;
      this.end = null;
      return finalAngles;
    }
    
    return this.interpolateCubic(this.start, this.end, t);
  }

  isMoving(): boolean {
    return this.end !== null;
  }

  private interpolateLinear(start: JointAngles, end: JointAngles, t: number): JointAngles {
    return {
      base: start.base + (end.base - start.base) * t,
      shoulder: start.shoulder + (end.shoulder - start.shoulder) * t,
      elbow: start.elbow + (end.elbow - start.elbow) * t,
      wristPitch: start.wristPitch + (end.wristPitch - start.wristPitch) * t,
      wristRoll: start.wristRoll + (end.wristRoll - start.wristRoll) * t,
      gripper: start.gripper + (end.gripper - start.gripper) * t
    };
  }

  private interpolateCubic(start: JointAngles, end: JointAngles, t: number): JointAngles {
    const smoothT = t * t * (3 - 2 * t);
    return this.interpolateLinear(start, end, smoothT);
  }
}
