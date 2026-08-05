#pragma once

#include "config.h"

constexpr int MAX_WAYPOINTS = 50;

class TeachMode {
private:
    float waypoints[MAX_WAYPOINTS][6];
    int count;
    int playIndex;
    bool isPlaying;
    
public:
    TeachMode() : count(0), playIndex(0), isPlaying(false) {}

    bool record(const float currentAngles[6]) {
        if (count >= MAX_WAYPOINTS) return false;
        for (int i = 0; i < 6; i++) {
            waypoints[count][i] = currentAngles[i];
        }
        count++;
        return true;
    }

    void play() {
        if (count > 0) {
            isPlaying = true;
            playIndex = 0;
        }
    }

    void clear() {
        count = 0;
        isPlaying = false;
        playIndex = 0;
    }

    int getRecordedCount() {
        return count;
    }

    bool active() {
        return isPlaying;
    }
    
    bool getNextWaypoint(float out_angles[6]) {
        if (!isPlaying || count == 0) return false;
        
        for (int i = 0; i < 6; i++) {
            out_angles[i] = waypoints[playIndex][i];
        }
        
        playIndex++;
        if (playIndex >= count) {
            playIndex = 0; // Loop replay
        }
        return true;
    }
};
