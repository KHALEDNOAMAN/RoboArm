<div align="center">

# 🤖 RoboArm

**6-DOF Robot Arm with Inverse Kinematics, Trajectory Planning & Interactive 3D Claw Machine Simulator**

[![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white)](https://isocpp.org/)
[![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white)](https://www.arduino.cc/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**Real Arduino firmware** for servo control + **Playable 3D claw machine** to test kinematics before building.

[🎮 **Try the Simulator**](https://robo-arm-elnoaman.vercel.app) | [📄 **Wiring Guide**](docs/wiring_diagram.md)

</div>

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────┐
│                    RoboArm                        │
├───────────────────┬──────────────────────────────┤
│   /firmware       │     /simulator               │
│   Arduino C++     │     3D Claw Machine Game     │
│                   │                              │
│  ┌─────────────┐  │  ┌──────────────────────────┐│
│  │ Inverse     │◄─┼──│  Same IK Algorithm       ││
│  │ Kinematics  │  │  │  (TypeScript port)       ││
│  └─────────────┘  │  └──────────────────────────┘│
│  ┌─────────────┐  │  ┌──────────────────────────┐│
│  │ 6x Servo    │  │  │  Simulated Joints        ││
│  │ PWM Control │  │  │  with smooth motion      ││
│  └─────────────┘  │  └──────────────────────────┘│
│  ┌─────────────┐  │  ┌──────────────────────────┐│
│  │ G-Code      │  │  │  Click-to-Move +         ││
│  │ Parser      │  │  │  Joint Sliders           ││
│  └─────────────┘  │  └──────────────────────────┘│
├───────────────────┴──────────────────────────────┤
│  Test in simulator → Flash to real robot arm     │
└──────────────────────────────────────────────────┘
```

---

## 🎮 Simulator — Claw Machine Game!

| Key/Mouse | Action |
|-----------|--------|
| Click in scene | Move end-effector to target (IK) |
| Joint sliders | Control each joint manually (FK) |
| G | Toggle gripper open/close |
| Space | Pick up nearest block |
| R | Reset blocks |
| T | Toggle "Show Math" overlay |
| E | Export current pose as Arduino code |
| 1-3 | Camera presets |

### Game Modes
- **Free Play** — Move arm freely, pick up objects
- **Sort Challenge** — Sort colored blocks into matching bins (timed!)
- **Stack Challenge** — Stack blocks into tallest tower

---

## 🔧 Firmware

### Components

| Component | Model | Qty | Purpose |
|-----------|-------|-----|---------|
| Arduino Mega | 2560 | 1 | Controller (6 PWM channels) |
| Servo Base | MG996R | 1 | Base rotation (0-180°) |
| Servo Shoulder | MG996R | 1 | Shoulder joint |
| Servo Elbow | MG996R | 1 | Elbow joint |
| Servo Wrist Pitch | SG90 | 1 | Wrist pitch |
| Servo Wrist Roll | SG90 | 1 | Wrist rotation |
| Servo Gripper | SG90 | 1 | Gripper open/close |
| Power Supply | 5V 10A | 1 | Servo power |

### Control Modes

| Mode | Input | Description |
|------|-------|-------------|
| Serial | USB | Send joint angles via serial commands |
| Joystick | 2x analog | Real-time XY control of end-effector |
| G-Code | USB/SD | CNC-style movement commands |
| Teach | Button | Record positions, play back sequence |

---

## 📊 Kinematics

### Forward Kinematics (FK)
Given joint angles θ₁...θ₆ → Calculate end-effector position (x, y, z)

### Inverse Kinematics (IK)
Given target (x, y, z) → Calculate required joint angles θ₁...θ₆

### DH Parameters
| Joint | θ | d (mm) | a (mm) | α |
|-------|---|--------|--------|---|
| 1 (Base) | θ₁ | 95 | 0 | 90° |
| 2 (Shoulder) | θ₂ | 0 | 105 | 0° |
| 3 (Elbow) | θ₃ | 0 | 98 | 0° |
| 4 (Wrist Pitch) | θ₄ | 0 | 0 | 90° |
| 5 (Wrist Roll) | θ₅ | 85 | 0 | 0° |

---

## 🚀 Quick Start

### Simulator
```bash
cd simulator
npm install
npm run dev
# Open http://localhost:5173 — play the claw machine! 🤖
```

### Firmware
```bash
pip install platformio
cd firmware
pio run -t upload    # Flash to Arduino Mega
pio device monitor   # Serial control
```

---

## 📝 License
MIT License — see [LICENSE](LICENSE) file.

<div align="center">
Built by [Khaled Noaman](https://github.com/KHALEDNOAMAN) — Computer Engineering Student 🚀
</div>
