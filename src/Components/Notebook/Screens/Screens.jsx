import { Html } from '@react-three/drei';
import { useEffect, useRef } from 'react';

function LinuxBootScreen({
  refName,
  distanceFactor,
  htmlPosition,
  htmlRotation,
}) {
  return (
    <Html
      transform
      wrapperClass="bootScreen"
      distanceFactor={distanceFactor}
      position={htmlPosition}
      rotation={htmlRotation}
      rotation-x={-0.256}
      ref={refName}
    >
<img src="/images/berdibek_Versel.png" alt="GitHub profilim" />
    </Html>
  );
}

function LinkedInScreen({
  refName,
  distanceFactor,
  htmlPosition,
  htmlRotation,
}) {
  return (
    <Html
      transform
      wrapperClass="linkedInScreen"
      distanceFactor={distanceFactor}
      position={htmlPosition}
      rotation={htmlRotation}
      rotation-x={-0.256}
      ref={refName}
      style={{
        opacity: 0,
        display: 'none',
      }}
    >
      <div className="linkedInScreen">
        <img src="./images/linkedin-printscreen.png"></img>
      </div>
    </Html>
  );
}

function GitHubScreen({ refName, distanceFactor, htmlPosition, htmlRotation }) {
  return (
    <Html
      transform
      wrapperClass="githubHtmlScreen"
      distanceFactor={distanceFactor}
      position={htmlPosition}
      rotation={htmlRotation}
      rotation-x={-0.256}
      ref={refName}
      style={{
        opacity: 0,
        cursor: 'default',
      }}
    >
      <div className="githubScrollbarHider">
        <img
          src="./images/github-screenshot.png"
          alt="GitHub Profile"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    </Html>
  );
}

export default function Screens({
  isOpen,
  isPoweredOn,
  isFinishedBooting,
  bootScreenRef,
  linkedInScreenRef,
  gitHubScreenRef,
  htmlPosition,
  htmlRotation,
  distanceFactor,
}) {
  return (
    <>
      {isOpen && isPoweredOn && !isFinishedBooting && (
        <LinuxBootScreen
          refName={bootScreenRef}
          distanceFactor={distanceFactor}
          htmlPosition={htmlPosition}
          htmlRotation={htmlRotation}
        />
      )}
      <LinkedInScreen
        refName={linkedInScreenRef}
        distanceFactor={distanceFactor}
        htmlPosition={htmlPosition}
        htmlRotation={htmlRotation}
      />
      <GitHubScreen
        refName={gitHubScreenRef}
        distanceFactor={distanceFactor}
        htmlPosition={htmlPosition}
        htmlRotation={htmlRotation}
      />
    </>
  );
}