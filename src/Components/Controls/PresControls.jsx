import { PresentationControls } from '@react-three/drei';
import { useControls } from 'leva';

export default function PresControls(props) {
  const parameters = {
    makeDefault: true,
    polar: [-0.1, 0.1],
    azimuth: [-0.5, 0.5],
    config: { mass: 2, tension: 400 },
    snap: { mass: 4, tension: 400 },
  };

  const { controlRotation } = useControls(
    'Presentation Controls',
    {
      controlRotation: {
        value: [0, 0, 0],
        step: 0.01,
      },
    }
  );

  return (
    <PresentationControls {...parameters} rotation={controlRotation}>
      {props.children}
    </PresentationControls>
  );
}
