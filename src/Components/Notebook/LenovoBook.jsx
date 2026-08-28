import { meshBounds } from '@react-three/drei';

import { useRef } from 'react';

export default function LenovoBook({ nodes, materials, refName }) {


  return (
    <mesh
      name="LenovoBook"
      geometry={nodes.Macbook.geometry}
      material={materials.PaletteMaterial001}
      position={[0, 0.519, 0]}
      scale={0.103}
      ref={refName}
      raycast={meshBounds}
    >
      <group
        name="Top"
        position={[0.007, -0.472, -10.412]}
        rotation={[1.358, 0, 0]}
        scale={5.796}
      >
        <mesh
          name="Circle002"
          geometry={nodes.Circle002.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          name="Circle002_1"
          geometry={nodes.Circle002_1.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          name="Circle002_2"
          geometry={nodes.Circle002_2.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          name="Circle002_3"
          geometry={nodes.Circle002_3.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          name="Circle002_4"
          geometry={nodes.Circle002_4.geometry}
          material={materials.PaletteMaterial001}
        />
        <mesh
          name="Circle002_5"
          geometry={nodes.Circle002_5.geometry}
          material={materials.PaletteMaterial001}
        />
      </group>
    </mesh>
  );
}
