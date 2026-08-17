# 6-DOF RoboArm & Simulator

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![C++](https://img.shields.io/badge/Language-C++-blue)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🤖 Overview
A 6-DOF Robot Arm with Inverse Kinematics, Trajectory Planning, and an Interactive 3D Claw Machine Simulator. Features both Arduino firmware and a playable web game.

## ✨ Features
- **Inverse Kinematics:** Analytical IK solver for precise positioning.
- **Trajectory Planning:** Cubic spline interpolation for smooth movements.
- **Servo Calibration:** Easy calibration routines for physical servos.
- **3D Claw Machine Simulator:** Interactive web-based 3D simulation.
- **Arduino Firmware:** Real-time motor control.
- **Joint Angle Visualization:** Real-time 3D feedback.

## 🏗️ Architecture

```text
User Input → IK Solver → Joint Angles → Servo Driver → Physical Arm
               ↓
        3D Visualization (Three.js)
```

## 📐 DH Parameters

| Joint | a | α | d | θ |
|-------|---|---|---|---|
| 1     | 0 | 90| L1| θ1|
| 2     | L2| 0 | 0 | θ2|
| 3     | L3| 0 | 0 | θ3|
| 4     | 0 | 90| 0 | θ4|
| 5     | 0 | -90| 0| θ5|
| 6     | 0 | 0 | L6| θ6|

## 🛠️ Tech Stack
- C++ (Arduino)
- TypeScript
- Three.js
- WebGL

## 🚀 Getting Started
### Hardware
1. Flash the Arduino firmware located in `firmware/`.
2. Connect servos to designated pins.
### Simulator
1. Navigate to `simulator/`.
2. Run `npm install` and `npm run dev`.

## 🧠 IK Algorithm
The Inverse Kinematics solver uses an analytical approach to calculate joint angles for a given end-effector position and orientation, ensuring deterministic and fast execution suitable for real-time control.

## 📁 Project Structure
- `firmware/` - Arduino C++ code
- `simulator/` - Three.js Web App
- `docs/` - Documentation

## 🗺️ Roadmap
- [ ] Computer Vision integration
- [ ] Reinforcement Learning for grasping
- [ ] Mobile App controller

## 🤝 
---

## How It Works

### Inverse Kinematics Pipeline
1. **Target Position** (x, y, z) is specified by user or trajectory planner
2. **IK Solver** calculates required joint angles using analytical geometry:
   - Shoulder angle: `θ1 = atan2(y, x)`
   - Elbow angle: Computed via law of cosines
   - Wrist angles: Derived from desired end-effector orientation
3. **Trajectory Planner** interpolates between current and target positions using cubic splines for smooth motion
4. **Servo Driver** converts joint angles to PWM signals (500-2500μs)
5. **3D Visualization** renders the arm in real-time using Three.js

### Motion Control
- **Joint Space**: Each servo moves independently at calibrated speed
- **Cartesian Space**: End-effector follows a straight line in 3D
- **Cubic Spline**: Smooth acceleration/deceleration profiles

---

## Screenshots & Demo

### 3D Claw Machine Simulator
```
┌───────────────────────────────────┐
│  RoboArm - Claw Machine          │
│  ┌─────────────────────────────┐ │
│  │         ┌───┐               │ │
│  │         │ ╔═╗ ← gripper     │ │
│  │         │ ║ ║               │ │
│  │    ┌────┘ ║ └────┐          │ │
│  │    │   link 2    │          │ │
│  │    └──────┬──────┘          │ │
│  │      ┌────┘                 │ │
│  │      │ link 1               │ │
│  │  ════╧════  base            │ │
│  │   ⬤ ⬤ ⬤  prizes            │ │
│  └─────────────────────────────┘ │
│  X: 120mm  Y: 85mm  Z: 200mm    │
│  [Grab] [Release] [Home] [Auto]  │
└───────────────────────────────────┘
```

### Joint Angle Visualization
```
Joint 1 (Base):     ████████░░  145°
Joint 2 (Shoulder): ██████░░░░  108°
Joint 3 (Elbow):    ████░░░░░░   72°
Joint 4 (Wrist 1):  █████████░  162°
Joint 5 (Wrist 2):  ███░░░░░░░   54°
Joint 6 (Gripper):  ██░░░░░░░░   30°
```

### Live Demo
> `npm install && npm run dev` → Open `http://localhost:3000`
> Use mouse to click targets, watch the arm solve IK in real-time!


Contributing
Contributions, issues, and feature requests are welcome!

## 📄 License
This project is licensed under the MIT License.
