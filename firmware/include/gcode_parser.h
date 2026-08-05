#pragma once

#include <Arduino.h>

enum GCodeType {
    NONE,
    RAPID_MOVE, // G0
    LINEAR_MOVE, // G1
    HOME, // G28
    GRIPPER_CLOSE, // M3
    GRIPPER_OPEN, // M5
    ENABLE_SERVOS, // M17
    DISABLE_SERVOS // M84
};

struct GCodeCommand {
    GCodeType type;
    float x;
    float y;
    float z;
    float feedrate;
    bool has_x;
    bool has_y;
    bool has_z;
    bool has_feedrate;
};

class GCodeParser {
public:
    static GCodeCommand parse(const String& line) {
        GCodeCommand cmd;
        cmd.type = NONE;
        cmd.has_x = false;
        cmd.has_y = false;
        cmd.has_z = false;
        cmd.has_feedrate = false;
        cmd.x = cmd.y = cmd.z = cmd.feedrate = 0.0;

        String uLine = line;
        uLine.toUpperCase();
        uLine.trim();

        int firstSpace = uLine.indexOf(' ');
        String commandWord = uLine;
        if (firstSpace != -1) {
            commandWord = uLine.substring(0, firstSpace);
        }

        if (commandWord == "G0") cmd.type = RAPID_MOVE;
        else if (commandWord == "G1") cmd.type = LINEAR_MOVE;
        else if (commandWord == "G28") cmd.type = HOME;
        else if (commandWord == "M3") cmd.type = GRIPPER_CLOSE;
        else if (commandWord == "M5") cmd.type = GRIPPER_OPEN;
        else if (commandWord == "M17") cmd.type = ENABLE_SERVOS;
        else if (commandWord == "M84") cmd.type = DISABLE_SERVOS;

        int idx = 0;
        while (idx < (int)uLine.length()) {
            char c = uLine.charAt(idx);
            if (c == 'X' || c == 'Y' || c == 'Z' || c == 'F') {
                int nextSpace = uLine.indexOf(' ', idx + 1);
                if (nextSpace == -1) nextSpace = uLine.length();
                float val = uLine.substring(idx + 1, nextSpace).toFloat();
                
                if (c == 'X') { cmd.x = val; cmd.has_x = true; }
                else if (c == 'Y') { cmd.y = val; cmd.has_y = true; }
                else if (c == 'Z') { cmd.z = val; cmd.has_z = true; }
                else if (c == 'F') { cmd.feedrate = val; cmd.has_feedrate = true; }
                
                idx = nextSpace;
            } else {
                idx++;
            }
        }
        return cmd;
    }
};
