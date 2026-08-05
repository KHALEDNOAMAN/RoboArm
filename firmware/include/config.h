#pragma once

#include <Arduino.h>

// Servo Pins
constexpr uint8_t PIN_BASE = 2;
constexpr uint8_t PIN_SHOULDER = 3;
constexpr uint8_t PIN_ELBOW = 4;
constexpr uint8_t PIN_WRIST_PITCH = 5;
constexpr uint8_t PIN_WRIST_ROLL = 6;
constexpr uint8_t PIN_GRIPPER = 7;

// Joint Limits (degrees)
constexpr float LIMIT_BASE_MIN = 0.0;
constexpr float LIMIT_BASE_MAX = 180.0;
constexpr float LIMIT_SHOULDER_MIN = 15.0;
constexpr float LIMIT_SHOULDER_MAX = 165.0;
constexpr float LIMIT_ELBOW_MIN = 0.0;
constexpr float LIMIT_ELBOW_MAX = 150.0;
constexpr float LIMIT_WRIST_PITCH_MIN = 0.0;
constexpr float LIMIT_WRIST_PITCH_MAX = 180.0;
constexpr float LIMIT_WRIST_ROLL_MIN = 0.0;
constexpr float LIMIT_WRIST_ROLL_MAX = 180.0;
constexpr float LIMIT_GRIPPER_MIN = 10.0; // Open
constexpr float LIMIT_GRIPPER_MAX = 73.0; // Closed

// DH Parameters (mm)
constexpr float DH_D[5] = {95.0, 0.0, 0.0, 0.0, 85.0};
constexpr float DH_A[5] = {0.0, 105.0, 98.0, 0.0, 0.0};
constexpr float DH_ALPHA[5] = {90.0, 0.0, 0.0, 90.0, 0.0};

// Home position (degrees)
constexpr float HOME_BASE = 90.0;
constexpr float HOME_SHOULDER = 90.0;
constexpr float HOME_ELBOW = 90.0;
constexpr float HOME_WRIST_PITCH = 90.0;
constexpr float HOME_WRIST_ROLL = 90.0;
constexpr float HOME_GRIPPER = 40.0;

// Movement config
constexpr float MAX_SPEED = 60.0; // deg/sec
constexpr float SMOOTHING_FACTOR = 0.1; // For basic lerp if needed

// Serial
constexpr uint32_t SERIAL_BAUD = 115200;
