#pragma once

#include "config.h"

struct Waypoint {
    float angles[6];
};

class Trajectory {
private:
    Waypoint start;
    Waypoint end;
    bool active;
    
public:
    Trajectory() : active(false) {}

    void setLinear(const float startAngles[6], const float endAngles[6]) {
        for (int i = 0; i < 6; i++) {
            start.angles[i] = startAngles[i];
            end.angles[i] = endAngles[i];
        }
        active = true;
    }

    void getAnglesAtTime(float t, float out_angles[6]) {
        if (t < 0.0) t = 0.0;
        if (t > 1.0) t = 1.0;

        // Linear interpolation
        for (int i = 0; i < 6; i++) {
            out_angles[i] = start.angles[i] + t * (end.angles[i] - start.angles[i]);
        }
    }
    
    void getCubicAnglesAtTime(float t, float out_angles[6]) {
        if (t < 0.0) t = 0.0;
        if (t > 1.0) t = 1.0;

        // Smoothstep interpolation (3t^2 - 2t^3)
        float s = 3.0 * t * t - 2.0 * t * t * t;
        
        for (int i = 0; i < 6; i++) {
            out_angles[i] = start.angles[i] + s * (end.angles[i] - start.angles[i]);
        }
    }
};
