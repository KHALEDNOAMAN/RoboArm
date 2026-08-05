#include <Arduino.h>
#include "config.h"
#include "kinematics.h"
#include "servo_controller.h"
#include "trajectory.h"
#include "gcode_parser.h"
#include "teach_mode.h"

ServoController arm;
TeachMode teachMode;
Trajectory planner;

void executeGCode(GCodeCommand cmd) {
    switch (cmd.type) {
        case RAPID_MOVE:
        case LINEAR_MOVE: {
            float targetAngles[5];
            if (Kinematics::inverseKinematics(cmd.x, cmd.y, cmd.z, 0.0, targetAngles)) {
                if (cmd.has_feedrate) {
                    arm.setSpeedLimit(cmd.feedrate / 60.0);
                }
                float fullAngles[6] = {targetAngles[0], targetAngles[1], targetAngles[2], targetAngles[3], targetAngles[4], 40.0};
                arm.setAllAngles(fullAngles);
            } else {
                Serial.println("Error: Unreachable position");
            }
            break;
        }
        case HOME: {
            float homeAngles[6] = {HOME_BASE, HOME_SHOULDER, HOME_ELBOW, HOME_WRIST_PITCH, HOME_WRIST_ROLL, HOME_GRIPPER};
            arm.setAllAngles(homeAngles);
            break;
        }
        case GRIPPER_CLOSE:
            arm.setAngle(5, LIMIT_GRIPPER_MAX);
            break;
        case GRIPPER_OPEN:
            arm.setAngle(5, LIMIT_GRIPPER_MIN);
            break;
        case ENABLE_SERVOS:
            arm.init();
            break;
        case DISABLE_SERVOS:
            arm.detachAll();
            break;
        default:
            Serial.println("Unknown or unhandled G-code");
            break;
    }
}

void setup() {
    Serial.begin(SERIAL_BAUD);
    pinMode(13, OUTPUT);
    digitalWrite(13, HIGH);
    
    arm.init();
    
    Serial.println("RoboArm initialized.");
}

void loop() {
    arm.update();

    if (Serial.available()) {
        String input = Serial.readStringUntil('\n');
        input.trim();
        if (input.length() == 0) return;

        if (input.startsWith("MOVE ")) {
            int firstSpace = input.indexOf(' ');
            int secondSpace = input.indexOf(' ', firstSpace + 1);
            int thirdSpace = input.indexOf(' ', secondSpace + 1);
            
            float x = input.substring(firstSpace + 1, secondSpace).toFloat();
            float y = input.substring(secondSpace + 1, thirdSpace).toFloat();
            float z = input.substring(thirdSpace + 1).toFloat();
            
            float targetAngles[5];
            if (Kinematics::inverseKinematics(x, y, z, 0.0, targetAngles)) {
                float angles[6];
                for(int i=0; i<5; i++) angles[i] = targetAngles[i];
                float current[6];
                arm.getCurrentAngles(current);
                angles[5] = current[5];
                arm.setAllAngles(angles);
                Serial.println("OK");
            } else {
                Serial.println("Error: Unreachable");
            }
        } else if (input.startsWith("JOINT ")) {
            int firstSpace = input.indexOf(' ');
            int secondSpace = input.indexOf(' ', firstSpace + 1);
            int joint = input.substring(firstSpace + 1, secondSpace).toInt();
            float angle = input.substring(secondSpace + 1).toFloat();
            arm.setAngle(joint, angle);
            Serial.println("OK");
        } else if (input.startsWith("GCODE ")) {
            String gcodeStr = input.substring(6);
            GCodeCommand cmd = GCodeParser::parse(gcodeStr);
            executeGCode(cmd);
            Serial.println("OK");
        } else if (input == "TEACH RECORD") {
            float currentAngles[6];
            arm.getCurrentAngles(currentAngles);
            if (teachMode.record(currentAngles)) {
                Serial.println("Recorded");
            } else {
                Serial.println("Memory full");
            }
        } else if (input == "TEACH PLAY") {
            teachMode.play();
            Serial.println("Playing");
        } else if (input == "TEACH CLEAR") {
            teachMode.clear();
            Serial.println("Cleared");
        } else if (input == "HOME") {
            float homeAngles[6] = {HOME_BASE, HOME_SHOULDER, HOME_ELBOW, HOME_WRIST_PITCH, HOME_WRIST_ROLL, HOME_GRIPPER};
            arm.setAllAngles(homeAngles);
            Serial.println("OK");
        } else if (input == "GRIP OPEN") {
            arm.setAngle(5, LIMIT_GRIPPER_MIN);
            Serial.println("OK");
        } else if (input == "GRIP CLOSE") {
            arm.setAngle(5, LIMIT_GRIPPER_MAX);
            Serial.println("OK");
        } else if (input == "STATUS") {
            float currentAngles[6];
            arm.getCurrentAngles(currentAngles);
            Pose p = Kinematics::forwardKinematics(currentAngles);
            
            Serial.print("{ \"angles\": [");
            for (int i = 0; i < 6; i++) {
                Serial.print(currentAngles[i]);
                if (i < 5) Serial.print(", ");
            }
            Serial.print("], \"position\": { \"x\": ");
            Serial.print(p.x);
            Serial.print(", \"y\": ");
            Serial.print(p.y);
            Serial.print(", \"z\": ");
            Serial.print(p.z);
            Serial.println(" } }");
        } else {
            Serial.println("Unknown command");
        }
    }
    
    static uint32_t lastReplayTime = 0;
    if (teachMode.active() && !arm.isMoving() && millis() - lastReplayTime > 500) {
        float nextAngles[6];
        if (teachMode.getNextWaypoint(nextAngles)) {
            arm.setAllAngles(nextAngles);
            lastReplayTime = millis();
        }
    }
}
