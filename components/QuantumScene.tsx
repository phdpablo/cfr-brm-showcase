/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

interface FactorNodeProps {
  position: [number, number, number];
  color: string;
  label?: string;
}

const FactorNode: React.FC<FactorNodeProps> = ({ position, color, label }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      // Subtle breathing animation
      const scale = 1 + Math.sin(t * 2 + position[0]) * 0.05;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={position}>
        <Sphere ref={ref} args={[0.4, 32, 32]}>
        <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.1}
            emissive={color}
            emissiveIntensity={0.2}
        />
        </Sphere>
        {label && (
            <Text
                position={[0, 0.6, 0]}
                fontSize={0.2}
                color="#0D232C"
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>
        )}
    </group>
  );
};

interface ItemNodeProps {
  position: [number, number, number];
  color: string;
}

const ItemNode: React.FC<ItemNodeProps> = ({ position, color }) => {
    return (
        <Box args={[0.3, 0.3, 0.3]} position={position}>
            <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
        </Box>
    )
}

interface ConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

const Connection: React.FC<ConnectionProps> = ({ start, end, color }) => {
    // Safe extraction of coordinates for dependency array to ensure stability
    const s0 = start?.[0] ?? 0;
    const s1 = start?.[1] ?? 0;
    const s2 = start?.[2] ?? 0;
    const e0 = end?.[0] ?? 0;
    const e1 = end?.[1] ?? 0;
    const e2 = end?.[2] ?? 0;

    const { position, quaternion, length } = useMemo(() => {
        // Explicitly check for validity
        if (!start || !end || start.length < 3 || end.length < 3) {
            return { 
                position: [0, 0, 0] as [number, number, number], 
                quaternion: [0, 0, 0, 1] as [number, number, number, number], 
                length: 0 
            };
        }

        const startVec = new THREE.Vector3(s0, s1, s2);
        const endVec = new THREE.Vector3(e0, e1, e2);
        
        const dist = startVec.distanceTo(endVec);
        if (dist < 0.001) {
            return { 
                position: [s0, s1, s2] as [number, number, number], 
                quaternion: [0, 0, 0, 1] as [number, number, number, number], 
                length: 0 
            };
        }

        const posVec = new THREE.Vector3().lerpVectors(startVec, endVec, 0.5);
        const dir = new THREE.Vector3().subVectors(endVec, startVec).normalize();
        
        const up = new THREE.Vector3(0, 1, 0);
        const quat = new THREE.Quaternion();
        
        if (Math.abs(dir.dot(up)) > 0.99999) {
             if (dir.y > 0) quat.identity();
             else quat.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI);
        } else {
             quat.setFromUnitVectors(up, dir);
        }
        
        // Return quaternion as array to prevent "read-only property" assignment errors in R3F
        return { 
            position: [posVec.x, posVec.y, posVec.z] as [number, number, number], 
            quaternion: [quat.x, quat.y, quat.z, quat.w] as [number, number, number, number], 
            length: dist 
        };
    }, [s0, s1, s2, e0, e1, e2, start, end]);

    if (length === 0) return null;

    return (
        <mesh position={position} quaternion={quaternion}>
            <cylinderGeometry args={[0.015, 0.015, length, 8]} />
            <meshStandardMaterial color={color} transparent opacity={0.4} />
        </mesh>
    );
}

const FactorModel = () => {
    const groupRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if(groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    })

    // Memoize the data structure so it is stable across renders
    const { factors, items, links } = useMemo(() => {
        const factorsData = [
            { id: 'F1', pos: [-1.5, 1.5, 0] as [number, number, number], label: 'Physical' },
            { id: 'F2', pos: [-0.5, 1.5, 0] as [number, number, number], label: 'Psych' },
            { id: 'F3', pos: [0.5, 1.5, 0] as [number, number, number], label: 'Social' },
            { id: 'F4', pos: [1.5, 1.5, 0] as [number, number, number], label: 'Env' },
        ];

        const itemsData: { id: string, pos: [number, number, number] }[] = [];
        const linksData: { start: [number, number, number], end: [number, number, number], type?: string }[] = [];

        factorsData.forEach((f, i) => {
            // Create 3 items below each factor
            for(let j=0; j<3; j++) {
                const xOffset = (j - 1) * 0.4;
                const itemPos: [number, number, number] = [f.pos[0] + xOffset, f.pos[1] - 2, 0];
                itemsData.push({ id: `${f.id}_${j}`, pos: itemPos });
                linksData.push({ start: f.pos, end: itemPos });
            }
            
            // Correlate factors
            if (i < factorsData.length - 1) {
                 linksData.push({ start: f.pos, end: factorsData[i+1].pos, type: 'correlation' });
            }
            if(i === factorsData.length -1) {
                linksData.push({ start: f.pos, end: factorsData[0].pos, type: 'correlation' });
            }
        });
        
        return { factors: factorsData, items: itemsData, links: linksData };
    }, []);

    return (
        <group ref={groupRef}>
            {factors.map(f => (
                <FactorNode key={f.id} position={f.pos} color="#F18C22" label={f.label} />
            ))}
            {items.map(it => (
                <ItemNode key={it.id} position={it.pos} color="#0D232C" />
            ))}
            {links.map((l, idx) => (
                <Connection 
                    key={idx} 
                    start={l.start} 
                    end={l.end} 
                    color={l.type === 'correlation' ? '#87CBCC' : '#0D232C'} 
                />
            ))}
        </group>
    )
}

export const FactorModelScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <FactorModel />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};