#pragma once

#include "config.h"
#include <Servo.h>

class ServoController {
private:
    Servo servos[6];
    float currentAngles[6];
    float targetAngles[6];
    uint32_t lastUpdate;
    float speedLimit; // degrees per second

    float constrainAngle(uint8_t joint, float angle) {
        switch(joint) {
            case 0: return constrain(angle, LIMIT_BASE_MIN, LIMIT_BASE_MAX);
            case 1: return constrain(angle, LIMIT_SHOULDER_MIN, LIMIT_SHOULDER_MAX);
            case 2: return constrain(angle, LIMIT_ELBOW_MIN, LIMIT_ELBOW_MAX);
            case 3: return constrain(angle, LIMIT_WRIST_PITCH_MIN, LIMIT_WRIST_PITCH_MAX);
            case 4: return constrain(angle, LIMIT_WRIST_ROLL_MIN, LIMIT_WRIST_ROLL_MAX);
            case 5: return constrain(angle, LIMIT_GRIPPER_MIN, LIMIT_GRIPPER_MAX);
            default: return angle;
        }
    }

    uint16_t angleToMicroseconds(float angle) {
        return (uint16_t)(500 + (angle / 180.0) * 2000);
    }

public:
    ServoController() : speedLimit(MAX_SPEED) {}

    void init() {
        servos[0].attach(PIN_BASE);
        servos[1].attach(PIN_SHOULDER);
        servos[2].attach(PIN_ELBOW);
        servos[3].attach(PIN_WRIST_PITCH);
        servos[4].attach(PIN_WRIST_ROLL);
        servos[5].attach(PIN_GRIPPER);

        float homeAngles[6] = {HOME_BASE, HOME_SHOULDER, HOME_ELBOW, 
                               HOME_WRIST_PITCH, HOME_WRIST_ROLL, HOME_GRIPPER};
        
        for (int i = 0; i < 6; i++) {
            currentAngles[i] = homeAngles[i];
            targetAngles[i] = homeAngles[i];
            servos[i].writeMicroseconds(angleToMicroseconds(currentAngles[i]));
        }
        lastUpdate = millis();
    }

    void setSpeedLimit(float degreesPerSecond) {
        speedLimit = degreesPerSecond;
    }

    void setAngle(uint8_t joint, float targetAngle) {
        if (joint < 6) {
            targetAngles[joint] = constrainAngle(joint, targetAngle);
        }
    }

    void setAllAngles(const float angles[6]) {
        for (int i = 0; i < 6; i++) {
            setAngle(i, angles[i]);
        }
    }

    void update() {
        uint32_t now = millis();
        float dt = (now - lastUpdate) / 1000.0;
        lastUpdate = now;

        float maxStep = speedLimit * dt;

        for (int i = 0; i < 6; i++) {
            float diff = targetAngles[i] - currentAngles[i];
            if (abs(diff) > 0.01) {
                float step = constrain(diff, -maxStep, maxStep);
                currentAngles[i] += step;
                servos[i].writeMicroseconds(angleToMicroseconds(currentAngles[i]));
            }
        }
    }

    void getCurrentAngles(float out_angles[6]) {
        for (int i = 0; i < 6; i++) {
            out_angles[i] = currentAngles[i];
        }
    }

    bool isMoving() {
        for (int i = 0; i < 6; i++) {
            if (abs(targetAngles[i] - currentAngles[i]) > 0.5) return true;
        }
        return false;
    }

    void detachAll() {
        for (int i = 0; i < 6; i++) {
            servos[i].detach();
        }
    }
};
