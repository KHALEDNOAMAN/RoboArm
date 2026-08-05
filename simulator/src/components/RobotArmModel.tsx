import React, { useRef } from 'react';
import { Group } from 'three';
import { JointAngles } from '../types';
import { SEGMENTS } from '../utils/constants';

interface Props {
  angles: JointAngles;
}

const RobotArmModel: React.FC<Props> = ({ angles }) => {
  const baseRef = useRef<Group>(null);
  const shoulderRef = useRef<Group>(null);
  const elbowRef = useRef<Group>(null);
  const wristRef = useRef<Group>(null);

  return (
    <group castShadow receiveShadow>
      <group ref={baseRef} position={[0, SEGMENTS.base.length/2, 0]} rotation={[0, angles.base, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1, 1.2, SEGMENTS.base.length, 32]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>

        <group position={[0, SEGMENTS.base.length/2, 0]} ref={shoulderRef} rotation={[0, 0, angles.shoulder]}>
          <mesh castShadow position={[0, SEGMENTS.shoulder.length/2, 0]}>
            <cylinderGeometry args={[0.5, 0.5, SEGMENTS.shoulder.length, 16]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.2} />
          </mesh>

          <group position={[0, SEGMENTS.shoulder.length, 0]} ref={elbowRef} rotation={[0, 0, angles.elbow]}>
            <mesh castShadow position={[0, SEGMENTS.elbow.length/2, 0]}>
              <cylinderGeometry args={[0.4, 0.4, SEGMENTS.elbow.length, 16]} />
              <meshStandardMaterial color="#eab308" />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.6, 16, 16]} />
              <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.2} />
            </mesh>

            <group position={[0, SEGMENTS.elbow.length, 0]} ref={wristRef} rotation={[0, 0, angles.wristPitch]}>
              <mesh castShadow position={[0, SEGMENTS.wrist.length/2, 0]}>
                <cylinderGeometry args={[0.3, 0.3, SEGMENTS.wrist.length, 16]} />
                <meshStandardMaterial color="#22c55e" />
              </mesh>
              <mesh>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.2} />
              </mesh>

              <group position={[0, SEGMENTS.wrist.length, 0]} rotation={[0, angles.wristRoll, 0]}>
                <mesh castShadow position={[0, 0.2, 0]}>
                  <boxGeometry args={[1.2, 0.4, 0.4]} />
                  <meshStandardMaterial color="#ef4444" />
                </mesh>
                <group position={[-0.4 - angles.gripper*0.2, 0.8, 0]}>
                  <mesh castShadow>
                    <boxGeometry args={[0.1, 1, 0.3]} />
                    <meshStandardMaterial color="#ef4444" />
                  </mesh>
                </group>
                <group position={[0.4 + angles.gripper*0.2, 0.8, 0]}>
                  <mesh castShadow>
                    <boxGeometry args={[0.1, 1, 0.3]} />
                    <meshStandardMaterial color="#ef4444" />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export default RobotArmModel;
