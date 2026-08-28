import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function PageButtonsHub({
  roomPage,
  switchRoomPage,
  isFinishedBooting,
  accessInfoPages,
}) {
  const hubRef = useRef();
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (isFinishedBooting) {
      showPanel();
    } else {
      hidePanel();
    }
  }, [isFinishedBooting]);

  const notebookPageSwitch = () => {
    setIsSwitching(true);
    switchRoomPage('notebook');
    // reload the page after 300ms:
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    // Reset isSwitching after a timeout
    setTimeout(() => setIsSwitching(false), 1500);
  };

  const infoPageSwitch = (infoPage) => {
    if (isSwitching) return; // Prevent switching if already in progress
    setIsSwitching(true);
    if (roomPage === 'notebook') {
      switchRoomPage(infoPage);
    } else {
      switchRoomPage(infoPage);
      accessInfoPages();
    }
    // Reset isSwitching after a timeout (adjust timing as needed)
    setTimeout(() => setIsSwitching(false), 3000);
  };

  const showPanel = () => {
    gsap.to(hubRef.current, {
      opacity: 1,
      delay: 2.5,
      duration: 1.5,
      onStart: () => {
        hubRef.current.style.display = 'block';
      },
      onComplete: () => {
        hubRef.current.style.pointerEvents = 'all';
      },
    });
  };

  const hidePanel = () => {
    if (hubRef.current) {
      gsap.to(hubRef.current, {
        opacity: 0,
        duration: 1.5,
        onStart: () => {
          hubRef.current.style.pointerEvents = 'none';
        },
        onComplete: () => {
          hubRef.current.style.display = 'none';
        },
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-end pageButtonsHubWrapper interface titilium-web"
      style={{ zIndex: 100, height: '100%', pointerEvents: 'none', opacity: 0 }}
      ref={hubRef}
    >
      <div className="controls">
        <div className="section d-flex flex-column text-start">
          <button
            id="custom-btn"
            className={
              'btn p-0 m-0 btn--ghost' +
              (roomPage === 'notebook' ? ' active-button' : ' inactive-button')
            }
            onClick={notebookPageSwitch}
            disabled={isSwitching}
          >
            Kitob
          </button>
          <button
            id="custom-btn"
            className={
              'btn p-0 m-0 btn--ghost' +
              (roomPage === 'about' ? ' active-button' : ' inactive-button')
            }
            onClick={() => infoPageSwitch('about')}
            disabled={isSwitching}
          >
            Men haqimda
          </button>
          <button
            id="custom-btn"
            className={
              'btn p-0 m-0 btn--ghost' +
              (roomPage === 'skills' ? ' active-button' : ' inactive-button')
            }
            onClick={() => infoPageSwitch('skills')}
            disabled={isSwitching}
          >
            Ko'nikmalar
          </button>
        </div>
      </div>
    </div>
  );
}
