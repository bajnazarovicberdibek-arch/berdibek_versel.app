import { useEffect } from 'react';
import { Html } from '@react-three/drei';
import { LoopOnce } from 'three';
import gsap from 'gsap';
import { button, useControls } from 'leva';

function OpenNotebookButton({
  nodes,
  animationsObject,
  open,
  refName,
  isOpen,
  isPoweredOn,
  isFinishedBooting,
  powerOnButtonRef,
  powerOffButtonRef,
  loadedPage,
  screenLightOn,
  lightRef,
  linkedInHtmlRef,
  githubHtmlRef,
}) {
  useEffect(() => {
    setTimeout(() => {
      if (refName.current) {
        gsap.to(refName.current.style, {
          opacity: 1,
          duration: 1,
          display: 'block',
          ease: 'power1.inOut',
          onComplete: () => {
            refName.current.style.pointerEvents = 'auto';
            refName.current.style.cursor = 'pointer';
          },
        });
      }
    }, 3000);
  }, []);


  // * METHOD
  const openNotebook = () => {
    const oldAction = animationsObject.actions['Close'];
    oldAction.stop();

    const action = animationsObject.actions['Open'];
    animationsObject.actions['Open'].setLoop(LoopOnce, 1);
    action.reset();
    action.clampWhenFinished = true;
    action.play();

    open();

    if (!isPoweredOn) {
      powerOffButtonRef.current.style.display = 'none';
      powerOffButtonRef.current.style.pointerEvents = 'none';

      gsap.to(powerOnButtonRef.current, {
        opacity: 1,
        delay: 2,
        duration: 1,
        display: 'block',
        ease: 'power1.inOut',
        onComplete: () => {
          powerOnButtonRef.current.style.display = 'block';
          powerOnButtonRef.current.style.pointerEvents = 'auto';
          powerOnButtonRef.current.style.cursor = 'pointer';
        },
      });
    } else {
      if (loadedPage === 'linkedIn' && isPoweredOn && isFinishedBooting) {
        gsap.to(linkedInHtmlRef.current, {
          onStart: () => {
            screenLightOn(lightRef);
          },
          opacity: 1,
          delay: 2,
          duration: 1,
          display: 'block',
        });
      }

      if (loadedPage === 'github' && isPoweredOn && isFinishedBooting) {
        gsap.to(githubHtmlRef.current, {
          onStart: () => {
            screenLightOn(lightRef);
          },
          opacity: 1,
          delay: 2,
          duration: 1,
          display: 'block',
        });
      }

      powerOnButtonRef.current.style.display = 'none';
      powerOnButtonRef.current.style.pointerEvents = 'none';

      gsap.to(powerOffButtonRef.current, {
        opacity: 1,
        delay: 1,
        duration: 1,
        display: 'block',
        ease: 'power1.inOut',
        onComplete: () => {
          powerOffButtonRef.current.style.display = 'block';
          powerOffButtonRef.current.style.pointerEvents = 'auto';
        },
      });
    }
  };

  // * LEVA
  useControls('Actions', {
    OpenLid: button(() => openNotebook()),
  });

  return (
    <Html
      transform
      position={[1.42, 0.58, 1]}
      rotation={[-0.3, 0, 0]}
      wrapperClass="pulse"
    >
      <div
        style={{
          opacity: 0,
          pointerEvents: 'none',
        }}
        className={`htmlButton ${isOpen ? 'active' : ''} pulsing`}
        ref={refName}
        onClick={openNotebook}
      >
        <i style={{
          marginTop: '1px'
        }} className="fa fa-caret-up"></i>
      </div>
    </Html>
  );
}

function CloseNotebookButton({
  animationsObject,
  close,
  refName,
  isOpen,
  powerOnButtonRef,
  powerOffButtonRef,
  loadedPage,
  linkedInHtmlRef,
  githubHtmlRef,
  screenLightOff,
  lightRef,
}) {
  // * METHOD
  const closeNotebook = () => {
    // Reset Power On/Off Buttons
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

    // Reset old animation, play new animation
    const oldAction = animationsObject.actions['Open'];
    oldAction.stop();

    const action = animationsObject.actions['Close'];
    animationsObject.actions['Close'].setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    action.setDuration(1.8);
    action.play();

    // Close Github HTML Screen
    if (loadedPage === 'github') {
      gsap.to(githubHtmlRef.current, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          action.play();
        },
      });
    }

    // Close LinkedIn HTML Screen
    if (loadedPage === 'linkedIn') {
      gsap.to(linkedInHtmlRef.current, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          action.play();
        },
      });
    }

    close();

    // 'Turn Off' rectAreaLight
    screenLightOff(lightRef);
  };

  // * LEVA
  useControls('Actions', {
    CloseLid: button(() => closeNotebook()),
  });

  return (
    <Html transform position={[1.42, 0.58, 1]} rotation={[-0.3, 0, 0]}>
      <div
        style={{
          opacity: 0,
          display: 'none',
          pointerEvents: 'none',
        }}
        className={`htmlButton ${!isOpen ? 'active' : ''}`}
        ref={refName}
        onClick={closeNotebook}
      >
        <i
          className="fa fa-caret-down"
          style={{
            paddingBottom: 0,
            lineHeight: 0,
            paddingTop: '4px',
          }}
        ></i>
      </div>
    </Html>
  );
}

export default function HingeButtons({
  nodes,
  isNewVisit,
  isOpen,
  isPoweredOn,
  isFinishedBooting,
  animationsObject,
  open,
  close,
  openButtonRef,
  closeButtonRef,
  powerOnButtonRef,
  powerOffButtonRef,
  loadedPage,
  linkedInHtmlRef,
  githubHtmlRef,
  screenLightOn,
  screenLightOff,
  lightRef,
}) {
  useEffect(() => {
    if (!isNewVisit) {
      if (isOpen) {
        gsap.to(closeButtonRef.current.style, {
          opacity: 1,
          delay: 1,
          duration: 2,
          onStart: () => {
            closeButtonRef.current.style.display = 'block';
          },
          onComplete: () => {
            closeButtonRef.current.style.pointerEvents = 'auto';
          },
        });

        gsap.to(openButtonRef.current.style, {
          opacity: 0,
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => {
            openButtonRef.current.style.pointerEvents = 'none';
          },
          onComplete: () => {
            openButtonRef.current.style.display = 'none';
          },
        });
      } else {
        gsap.to(openButtonRef.current.style, {
          opacity: 1,
          delay: 1.8,
          duration: 0.5,
          onStart: () => {
            openButtonRef.current.style.display = 'block';
            openButtonRef.current.style.pointerEvents = 'none';
          },
          onComplete: () => {
            openButtonRef.current.style.pointerEvents = 'auto';
          },
        });

        gsap.to(closeButtonRef.current.style, {
          opacity: 0,
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => {
            closeButtonRef.current.style.pointerEvents = 'none';
          },
          onComplete: () => {
            closeButtonRef.current.style.display = 'none';
          },
        });

        gsap.to(closeButtonRef.current.style, {
          duration: 3,
          onStart: () => {
            closeButtonRef.current.style.pointerEvents = 'none';
          },
          onComplete: () => {
            closeButtonRef.current.style.pointerEvents = 'auto';
          },
        });
      }
    } else {
      // if (openButtonRef.current) {
      //   gsap.to(openButtonRef.current.style, {
      //     opacity: 1,
      //     delay: 2.5,
      //     duration: 0.5,
      //     onComplete: () => {
      //       openButtonRef.current.style.pointerEvents = 'auto';
      //     },
      //   });
      // }
    }
  }, [isOpen]);

  return (
    <>
      <OpenNotebookButton
        nodes={nodes}
        refName={openButtonRef}
        isOpen={isOpen}
        isPoweredOn={isPoweredOn}
        isFinishedBooting={isFinishedBooting}
        animationsObject={animationsObject}
        open={open}
        powerOnButtonRef={powerOnButtonRef}
        powerOffButtonRef={powerOffButtonRef}
        loadedPage={loadedPage}
        linkedInHtmlRef={linkedInHtmlRef}
        githubHtmlRef={githubHtmlRef}
        screenLightOn={screenLightOn}
        lightRef={lightRef}
      />
      <CloseNotebookButton
        refName={closeButtonRef}
        isOpen={isOpen}
        isPoweredOn={isPoweredOn}
        isFinishedBooting={isFinishedBooting}
        animationsObject={animationsObject}
        close={close}
        powerOnButtonRef={powerOnButtonRef}
        powerOffButtonRef={powerOffButtonRef}
        loadedPage={loadedPage}
        linkedInHtmlRef={linkedInHtmlRef}
        githubHtmlRef={githubHtmlRef}
        screenLightOff={screenLightOff}
        lightRef={lightRef}
      />
    </>
  );
}
