import React from 'react';
import { Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';

export default function PageMoveButton({
  label,
  buttonPosition,
  targetPosition,
}) {
  const { camera } = useThree();

  const handleClick = () => {
    // Smooth transition to the target section using GSAP
    gsap.to(camera.position, {
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      duration: 1.5, // Adjust the duration as needed
      ease: 'power2.inOut',
    });
  };

  return (
    <Html position={buttonPosition}>
      <button onClick={handleClick} className="page-button">
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </Html>
  );
}
