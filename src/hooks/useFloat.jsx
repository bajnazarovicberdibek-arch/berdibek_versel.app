import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect } from 'react';

import * as THREE from 'three';

export const useFloat = (
  group,
  { distance = 3, enableRotation = true },
  startExplode
) => {
  let time = 0;

  useEffect(() => {
    const groupWorldPosition = new THREE.Vector3();
    group.current.getWorldPosition(groupWorldPosition);

    group.current.children.forEach((mesh) => {
      mesh.originalPosition = mesh.position.clone();
      const meshWorldPosition = new THREE.Vector3();
      mesh.getWorldPosition(meshWorldPosition);

      mesh.directionVector = meshWorldPosition
        .clone()
        .sub(groupWorldPosition)
        .normalize();

      mesh.originalRotation = mesh.rotation.clone();

      mesh.targetPosition = new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      mesh.targetRotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
    });
  }, []);

  useEffect(() => {
    group.current.children.forEach((mesh) => {
      mesh.targetPosition = mesh.originalPosition
        .clone()
        .add(mesh.directionVector.clone().multiplyScalar(distance));
    });
  }, [distance]);

  useFrame((state, delta) => {
    if (startExplode) {
      time += delta;

      group.current.children.forEach((mesh) => {
        if (mesh.originalPosition) {
          mesh.position.x = THREE.MathUtils.lerp(
            mesh.originalPosition.x,
            mesh.targetPosition.x,
            time
          );
          mesh.position.y = THREE.MathUtils.lerp(
            mesh.originalPosition.y,
            mesh.targetPosition.y,
            time
          );
          mesh.position.z = THREE.MathUtils.lerp(
            mesh.originalPosition.z,
            mesh.targetPosition.z,
            time
          );
        }

        if (enableRotation) {
          if (mesh.originalPosition) {
            mesh.rotation.x = THREE.MathUtils.lerp(
              mesh.originalRotation.x,
              mesh.targetRotation.x,
              time * 1.3
            );
            mesh.rotation.y = THREE.MathUtils.lerp(
              mesh.originalRotation.y,
              mesh.targetRotation.y,
              time * 1.3
            );
            mesh.rotation.z = THREE.MathUtils.lerp(
              mesh.originalRotation.z,
              mesh.targetRotation.z,
              time * 1.3
            );
          }
        }
      });
    }
  });
};
