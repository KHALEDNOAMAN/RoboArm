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

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📄 License
This project is licensed under the MIT License.
