import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Billboard, Text } from '@react-three/drei';
import gsap from 'gsap';

// * COMPONENTS
function ExternalLinkCaption({
  isOpen,
  isPoweredOn,
  isFinishedBooting,
  loadedPage,
  showCaption,
  hideCaption,
}) {
  // * REFS
  const billBoardRef = useRef();
  const textRef1 = useRef();
  const textRef2 = useRef();

  useEffect(() => {
    if (isOpen && isPoweredOn && isFinishedBooting) {
      showCaption(3.8, 5.2, billBoardRef, textRef1, textRef2);
    } else {
      hideCaption(billBoardRef, textRef1, textRef2);
    }
  }, [isOpen, isPoweredOn, isFinishedBooting]);

  // * HELPER METHODS
  const openWindow = () => {
    const link =
      loadedPage === 'github'
        ? 'https://github.com/nothingnothings'
        : 'https://linkedin.com/in/arthur-dalla-corte-panazolo';

    if ((isOpen, isPoweredOn, isFinishedBooting)) {
      window.open(link, '_blank');
    }
  };

  const pointerOver = () => {
    if ((isOpen, isPoweredOn, isFinishedBooting)) {
      textRef2.current.material = new THREE.MeshBasicMaterial({
        color: '#ffffff',
        toneMapped: false,
      });
    }
  };

  const pointerLeave = () => {
    if ((isOpen, isPoweredOn, isFinishedBooting)) {
      textRef2.current.material = new THREE.MeshBasicMaterial({
        color: '#ffff01',
        toneMapped: false,
      });
    }
  };

  return (
    <Billboard ref={billBoardRef}>
      <Text
        font={'./fonts/titillium-web-v17-latin-regular.woff'}
        position={[-0.54, 2, 0]}
        scale={0.24}
        ref={textRef1}
      >
        To view this profile in another window,
        <meshBasicMaterial
          attach="material"
          color="rgba(0, 25, 51)"
          toneMapped={false}
          opacity={0}
        />
      </Text>
      <group>
        <Text
          font={'./fonts/titillium-web-v17-latin-regular.woff'}
          position={[1.94, 2, 0]}
          scale={0.24}
          ref={textRef2}
          onClick={openWindow}
          onPointerOver={pointerOver}
          onPointerLeave={pointerLeave}
        >
          click here.
          <meshBasicMaterial
            attach="material"
            color="#ffff01"
            toneMapped={false}
            opacity={0}
          />
        </Text>
      </group>
    </Billboard>
  );
}

function OpenNotebookCaption({ isNewVisit, isOpen, showCaption, hideCaption }) {
  const billBoardRef = useRef();
  const textRef1 = useRef();
  const textRef2 = useRef();

  useEffect(() => {
    if (!isNewVisit) {
      if (isOpen) {
        hideCaption(billBoardRef, textRef1, textRef2);
      } else {
        showCaption(2.2, 2.2, billBoardRef, textRef1, textRef2);
      }
    } else {
      showCaption(1, 2, billBoardRef, textRef1, textRef2);
    }
  }, [isOpen]);

  return (
    <Billboard ref={billBoardRef}>
      <Text
        font={'./fonts/titillium-web-v17-latin-regular.woff'}
        position={[-1.02, -2.02, 0]}
        scale={0.24}
        ref={textRef1}
      >
        To take a look at my profile,
        <meshBasicMaterial
          attach="material"
          color="rgba(0, 25, 51)"
          toneMapped={false}
          opacity={0}
        />
      </Text>
      <Text
        font={'./fonts/titillium-web-v17-latin-regular.woff'}
        position={[1.4, -2.02, 0]}
        scale={0.24}
        ref={textRef2}
      >
        open the Notebook.
        <meshBasicMaterial
          attach="material"
          color="#ffff01"
          toneMapped={false}
          opacity={0}
        />
      </Text>
    </Billboard>
  );
}

function PowerNotebookOnCaption({
  isOpen,
  isPoweredOn,
  isFinishedBooting,
  showCaption,
  hideCaption,
}) {
  const billBoardRef = useRef();
  const textRef1 = useRef();
  const textRef2 = useRef();

  useEffect(() => {
    if (isOpen && !isPoweredOn && !isFinishedBooting) {
      showCaption(2.8, 3.8, billBoardRef, textRef1, textRef2);
    } else {
      hideCaption(billBoardRef, textRef1, textRef2);
    }
  }, [isOpen, isPoweredOn, isFinishedBooting]);

  return (
    <Billboard ref={billBoardRef}>
      <Text
        font={'./fonts/titillium-web-v17-latin-regular.woff'}
        position={[-1.26, -2.02, 0]}
        scale={0.24}
        ref={textRef1}
      >
        To use the Notebook,
        <meshBasicMaterial
          attach="material"
          color="rgba(0, 25, 51)"
          toneMapped={false}
          opacity={0}
        />
      </Text>
      <Text
        font={'./fonts/titillium-web-v17-latin-regular.woff'}
        position={[1.1, -2.02, 0]}
        scale={0.24}
        ref={textRef2}
      >
        press the Power Button.
        <meshBasicMaterial
          attach="material"
          color="#ffff01"
          toneMapped={false}
          opacity={0}
        />
      </Text>
    </Billboard>
  );
}

export default function Captions({
  isNewVisit,
  changeVisitStatus,
  isOpen,
  isPoweredOn,
  isFinishedBooting,
  loadedPage,
}) {
  // * HELPER METHODS
  const showCaption = (delay1, delay2, billBoardRef, textRef1, textRef2) => {
    if (isNewVisit) {
      changeVisitStatus();
    }
    gsap.to(textRef1.current.material, {
      opacity: 1,
      duration: 1,
      delay: delay1,
      onStart: () => {
        billBoardRef.current.visible = true;
      },
    });

    gsap.to(textRef2.current.material, {
      opacity: 1,
      duration: 1,
      delay: delay2,
    });
  };

  const hideCaption = (billBoardRef, textRef1, textRef2) => {
    gsap.to(textRef1.current.material, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        billBoardRef.current.visible = false;
      },
    });

    gsap.to(textRef2.current.material, {
      opacity: 0,
      duration: 1,
    });
  };

  // * PARAMETER OBJECTS
  const externalLinkCaptionProps = {
    isOpen,
    isPoweredOn,
    isFinishedBooting,
    loadedPage,
    showCaption,
    hideCaption,
  };

  const openNotebookCaptionProps = {
    isNewVisit,
    isOpen,
    showCaption,
    hideCaption,
  };

  const powerNotebookOnCaptionProps = {
    isOpen,
    isPoweredOn,
    isFinishedBooting,
    showCaption,
    hideCaption,
  };

  return (
    <>
      <ExternalLinkCaption {...externalLinkCaptionProps} />
      <OpenNotebookCaption {...openNotebookCaptionProps} />
      <PowerNotebookOnCaption {...powerNotebookOnCaptionProps} />
    </>
  );
}
