import React, { useMemo } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { BlockState, Vec3 } from '../types';
import { BINS } from '../utils/constants';

interface Props {
  blocks: BlockState[];
  onGroundClick: (pos: Vec3) => void;
  targetPos: Vec3 | null;
}

const GameScene: React.FC<Props> = ({ blocks, onGroundClick, targetPos }) => {
  const renderedBlocks = useMemo(() => blocks.map(b => (
    <mesh key={b.id} position={[b.position.x, b.position.y, b.position.z]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={b.color} />
    </mesh>
  )), [blocks]);

  const renderedBins = useMemo(() => BINS.map(bin => (
    <mesh key={bin.id} position={[bin.position.x, bin.position.y, bin.position.z]} receiveShadow>
      <boxGeometry args={[1.5, 0.1, 1.5]} />
      <meshStandardMaterial color={bin.color} transparent opacity={0.5} />
    </mesh>
  )), []);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onGroundClick({ x: e.point.x, y: 0, z: e.point.z });
  };

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow onClick={handleClick}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      <gridHelper args={[20, 20, '#2a2a3e', '#12121e']} />
      
      {renderedBlocks}
      {renderedBins}

      {targetPos && (
        <mesh position={[targetPos.x, 0.01, targetPos.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.4, 32]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
};

export default GameScene;
