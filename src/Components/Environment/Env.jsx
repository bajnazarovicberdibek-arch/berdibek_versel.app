import { Environment } from '@react-three/drei';

export default function Env() {
  return (
    <>
      <Environment
        files={'./images/distribution_board_1k.jpg'}
        backgroundIntensity={0.5}
        environmentIntensity={0.3}
        environmentRotation={[Math.PI / 2.45, Math.PI / 6.1, 0]}
        background={false}
        resolution={1024}
      />
    </>
  );
}
