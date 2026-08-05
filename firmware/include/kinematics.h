#pragma once

#include "config.h"
#include <math.h>

struct Pose {
    float x;
    float y;
    float z;
    float pitch;
    float roll;
};

class Kinematics {
public:
    static Pose forwardKinematics(const float angles[6]) {
        float theta1 = angles[0] * PI / 180.0;
        float theta2 = angles[1] * PI / 180.0;
        float theta3 = angles[2] * PI / 180.0;
        float theta4 = angles[3] * PI / 180.0;

        float l1 = DH_D[0];
        float l2 = DH_A[1];
        float l3 = DH_A[2];
        float l4 = DH_D[4];

        float arm_angle = theta2 + theta3 + theta4; 
        
        float r = l2 * cos(theta2) + l3 * cos(theta2 + theta3) + l4 * cos(arm_angle);
        float z = l1 + l2 * sin(theta2) + l3 * sin(theta2 + theta3) + l4 * sin(arm_angle);
        
        Pose p;
        p.x = r * cos(theta1);
        p.y = r * sin(theta1);
        p.z = z;
        p.pitch = arm_angle * 180.0 / PI; 
        p.roll = angles[4]; 
        
        return p;
    }

    static bool inverseKinematics(float x, float y, float z, float pitch_deg, float out_angles[5]) {
        if (!isReachable(x, y, z)) return false;

        float l1 = DH_D[0];
        float l2 = DH_A[1];
        float l3 = DH_A[2];
        float l4 = DH_D[4];

        float theta1 = atan2(y, x);
        float pitch_rad = pitch_deg * PI / 180.0;
        float r = sqrt(x*x + y*y);
        
        float r_w = r - l4 * cos(pitch_rad);
        float z_w = z - l4 * sin(pitch_rad) - l1;
        
        float d2 = r_w * r_w + z_w * z_w;
        float d = sqrt(d2);
        
        if (d > (l2 + l3) || d < fabs(l2 - l3)) {
            return false;
        }
        
        float cos_theta3 = (d2 - l2*l2 - l3*l3) / (2.0 * l2 * l3);
        float theta3 = acos(cos_theta3); 
        
        float alpha = atan2(z_w, r_w);
        float beta = acos((l2*l2 + d2 - l3*l3) / (2.0 * l2 * d));
        float theta2 = alpha - beta;
        
        float theta4 = pitch_rad - (theta2 + theta3);
        
        out_angles[0] = theta1 * 180.0 / PI;
        out_angles[1] = theta2 * 180.0 / PI;
        out_angles[2] = theta3 * 180.0 / PI;
        out_angles[3] = theta4 * 180.0 / PI;
        out_angles[4] = 90.0; 
        
        return true;
    }

    static bool isReachable(float x, float y, float z) {
        float r = sqrt(x*x + y*y);
        float d = sqrt(r*r + (z-DH_D[0])*(z-DH_D[0]));
        float max_reach = DH_A[1] + DH_A[2] + DH_D[4];
        return d <= max_reach;
    }
};
