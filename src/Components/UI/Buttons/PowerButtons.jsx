import { Html } from '@react-three/drei';
import gsap from 'gsap';
import { button, useControls } from 'leva';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PowerOnButton({
  bootAudio,
  turnComputerFansOn,
  powerOn,
  finishBooting,
  powerOnButtonRef,
  powerOffButtonRef,
  closeButtonRef,
  linuxBootScreenHtmlRef,
  linkedInHtmlRef,
  githubHtmlRef,
  screenLightOn,
  lightRef,
  loadedPage,
}) {
  // * METHOD
  const powerNotebookOn = () => {
    // Play computer boot sound:
    bootAudio.play();

    // Play computer fan sound:
    turnComputerFansOn();

    // Update Zustand Store's state, showing linux boot screen
    powerOn();

    // Hide 'Power On' button
    gsap.to(powerOnButtonRef.current, {
      opacity: 0,
      duration: 0.5,
      display: 'none',
      ease: 'power1.inOut',
      onStart: () => {
        powerOnButtonRef.current.style.display = 'none';
        powerOnButtonRef.current.style.pointerEvents = 'none';
      },
    });

    // Show 'Power Off' button
    gsap.to(powerOffButtonRef.current, {
      opacity: 1,
      duration: 1,
      display: 'block',
      ease: 'power1.inOut',
      onComplete: () => {
        powerOffButtonRef.current.style.display = 'block';
      },
    });

    // Hide 'Close' button
    gsap.to(closeButtonRef.current, {
      opacity: 0,
      duration: 1.5,
      onStart: () => {
        closeButtonRef.current.style.pointerEvents = 'none';
      },
      onComplete: () => {
        closeButtonRef.current.style.display = 'none';
      },
    });

    // Show 'Close' button
    gsap.to(closeButtonRef.current, {
      opacity: 1,
      duration: 0.5,
      delay: 9,
      ease: 'power1.inOut',
      onStart: () => {
        closeButtonRef.current.style.display = 'block';
      },
      onComplete: () => {
        // closeButtonRef.current.style.pointerEvents = 'auto';
      },
    });

    // Hide 'Boot Screen'
    gsap.to(linuxBootScreenHtmlRef.current, {
      delay: 7.25,
      duration: 0,
      display: 'none',
      onComplete: () => {
        // Update Zustand Store's state, hiding Linux Boot Screen
        finishBooting();
      },
    });

    // Show 'LinkedIn' screen, if it was the last loaded page
    if (loadedPage === 'linkedIn') {
      gsap.to(linkedInHtmlRef.current, {
        opacity: 1,
        delay: 8,
        onStart: () => {
          githubHtmlRef.current.style.display = 'none';
          linkedInHtmlRef.current.style.pointerEvents = 'default';
          screenLightOn(lightRef);
        },
        duration: 1,
        display: 'block',
      });
    }

    // Show 'GitHub' screen, if it was the last loaded page
    if (loadedPage === 'github') {
      gsap.to(githubHtmlRef.current, {
        opacity: 1,
        delay: 8,
        onStart: () => {
          linkedInHtmlRef.current.style.display = 'none';
          screenLightOn(lightRef);
        },
        duration: 1,
        display: 'block',
      });
    }

    gsap.to(powerOffButtonRef.current, {
      delay: 13,
      duration: 0,
      onComplete: () => {
        powerOffButtonRef.current.style.pointerEvents = 'auto';
      },
    });

    gsap.to(closeButtonRef.current, {
      delay: 13,
      duration: 0,
      onComplete: () => {
        closeButtonRef.current.style.pointerEvents = 'auto';
      },
    });
  };

  // * LEVA
  useControls('Actions', {
    PowerOn: button(() => powerNotebookOn()),
  });

  return (
    <Html
      transform
      position={[0.993, 0.5, -1.07]}
      rotation={[Math.PI * 0.5, 0, Math.PI * 1]}
      style={{
        opacity: 0,
        pointerEvents: 'none',
      }}
      ref={powerOnButtonRef}
    >
      <div onClick={powerNotebookOn}>
        <FontAwesomeIcon
          icon={faPowerOff}
          style={{
            fontSize: '0.5rem',
            color: 'white',
            borderRadius: '50%',
            background: 'black',
            padding: '0.01rem',
          }}
          className="pulsing"
        />
      </div>
    </Html>
  );
}

function PowerOffButton({
  turnComputerFansOff,
  powerOff,
  powerOnButtonRef,
  powerOffButtonRef,
  closeButtonRef,
  linkedInHtmlRef,
  githubHtmlRef,
  screenLightOff,
  lightRef,
}) {
  // * METHOD
  const powerNotebookOff = () => {
    // Update Zustand Store's state
    powerOff();

    // Stop computer fan sound
    turnComputerFansOff();

    // Disable 'Close' button:
    gsap.to(closeButtonRef.current, {
      duration: 3,
      onStart: () => {
        closeButtonRef.current.style.pointerEvents = 'none';
      },
      onComplete: () => {
        closeButtonRef.current.style.pointerEvents = 'all';
      },
    });

    // Hide 'Power Off' button
    gsap.to(powerOffButtonRef.current, {
      opacity: 0,
      duration: 0.5,
      display: 'none',
      ease: 'power1.inOut',
      onStart: () => {
        powerOffButtonRef.current.style.display = 'none';
        powerOffButtonRef.current.style.pointerEvents = 'none';
      },
    });

    // Show 'Power On' button
    gsap.to(powerOnButtonRef.current, {
      opacity: 1,
      duration: 1,
      display: 'block',
      ease: 'power1.inOut',
      onComplete: () => {
        powerOnButtonRef.current.style.display = 'block';
      },
    });

    gsap.to(powerOnButtonRef.current, {
      delay: 3,
      duration: 0,
      onComplete: () => {
        powerOnButtonRef.current.style.pointerEvents = 'auto';
      },
    });

    // Hide 'LinkedIn' screen
    gsap.to(linkedInHtmlRef.current, {
      opacity: 0,
      duration: 0.8,
      display: 'none',
    });

    // Hide 'GitHub' screen
    gsap.to(githubHtmlRef.current, {
      opacity: 0,
      duration: 0.8,
      display: 'none',
    });

    // 'Turn Off' rectAreaLight
    screenLightOff(lightRef);
  };

  // * LEVA
  useControls('Actions', {
    PowerOff: button(() => powerNotebookOff()),
  });

  return (
    <Html
      transform
      position={[0.993, 0.5, -1.07]}
      rotation={[Math.PI * 0.5, 0, Math.PI * 1]}
      style={{ opacity: 0 }}
      ref={powerOffButtonRef}
    >
      <div onClick={powerNotebookOff}>
        <FontAwesomeIcon
          icon={faPowerOff}
          style={{
            fontSize: '0.5rem',
            color: '#ffff01',
            borderRadius: '50%',
            cursor: 'pointer',
            background: 'black',
            padding: '0.01rem',
          }}
        />
      </div>
    </Html>
  );
}

export default function PowerButtons({
  bootAudio,
  turnComputerFansOn,
  turnComputerFansOff,
  powerOn,
  powerOff,
  finishBooting,
  powerOnButtonRef,
  powerOffButtonRef,
  closeButtonRef,
  linuxBootScreenHtmlRef,
  linkedInHtmlRef,
  githubHtmlRef,
  loadedPage,
  screenLightOn,
  screenLightOff,
  lightRef,
}) {
  return (
    <>
      <PowerOnButton
        bootAudio={bootAudio}
        turnComputerFansOn={turnComputerFansOn}
        powerOn={powerOn}
        finishBooting={finishBooting}
        powerOnButtonRef={powerOnButtonRef}
        powerOffButtonRef={powerOffButtonRef}
        closeButtonRef={closeButtonRef}
        linuxBootScreenHtmlRef={linuxBootScreenHtmlRef}
        linkedInHtmlRef={linkedInHtmlRef}
        githubHtmlRef={githubHtmlRef}
        screenLightOn={screenLightOn}
        lightRef={lightRef}
        loadedPage={loadedPage}
      />
      <PowerOffButton
        turnComputerFansOff={turnComputerFansOff}
        powerOff={powerOff}
        powerOnButtonRef={powerOnButtonRef}
        powerOffButtonRef={powerOffButtonRef}
        closeButtonRef={closeButtonRef}
        linkedInHtmlRef={linkedInHtmlRef}
        githubHtmlRef={githubHtmlRef}
        screenLightOff={screenLightOff}
        lightRef={lightRef}
      />
    </>
  );
}
