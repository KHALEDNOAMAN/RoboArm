# Wiring Diagram — RoboArm 6-DOF

## Joint Layout

```
              [Gripper]  ← Joint 6 (SG90)
                  │
           [Wrist Roll]  ← Joint 5 (SG90)
                  │
          [Wrist Pitch]  ← Joint 4 (SG90)
                  │
              ┌───┘
              │  Forearm (98mm)
              │
           [Elbow]  ← Joint 3 (MG996R)
              │
              │  Upper Arm (105mm)
              │
          [Shoulder]  ← Joint 2 (MG996R)
              │
              │  Base height (95mm)
              │
           [Base]  ← Joint 1 (MG996R)
         ═════════
          Platform
```

## Arduino Mega Pin Mapping

### Servo Motors
| Joint | Servo | Arduino Pin | Range |
|-------|-------|-------------|-------|
| 1 - Base | MG996R | D2 | 0° - 180° |
| 2 - Shoulder | MG996R | D3 | 15° - 165° |
| 3 - Elbow | MG996R | D4 | 0° - 150° |
| 4 - Wrist Pitch | SG90 | D5 | 0° - 180° |
| 5 - Wrist Roll | SG90 | D6 | 0° - 180° |
| 6 - Gripper | SG90 | D7 | 10° - 73° |

### Other Connections
| Component | Pin | Function |
|-----------|-----|----------|
| Status LED | D13 | Mode indicator |
| Joystick X | A0 | Manual X control |
| Joystick Y | A1 | Manual Y control |
| Joystick Btn | D8 | Gripper toggle |

## Power

```
5V 10A Power Supply
├── Arduino Mega VIN (via barrel jack)
├── Servo Power Rail (separate from Arduino!)
│   ├── MG996R × 3 (high current, up to 2.5A each under load)
│   └── SG90 × 3 (lower current)
└── Common GND with Arduino

⚠️ IMPORTANT: Do NOT power servos from Arduino 5V pin!
   Use separate 5V supply with common ground.
```

## Parts List (BOM)

| # | Component | Model | Qty | Cost |
|---|-----------|-------|-----|------|
| 1 | Controller | Arduino Mega 2560 | 1 | $12 |
| 2 | High-Torque Servo | MG996R | 3 | $12 |
| 3 | Micro Servo | SG90 | 3 | $4 |
| 4 | Robot Arm Kit | 6-DOF Mechanical Arm | 1 | $25 |
| 5 | Power Supply | 5V 10A | 1 | $8 |
| 6 | Joystick | Analog 2-axis | 1 | $2 |
| 7 | Breadboard + Wires | Jumpers | 1 set | $3 |
| | | | **Total** | **~$66** |
