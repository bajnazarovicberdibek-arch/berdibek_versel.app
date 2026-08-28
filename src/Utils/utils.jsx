import gsap from 'gsap';

export const interpolateFunc = (t) => 1 - Math.exp(-5 * t) + 0.007 * t;

export const screenLightOn = (screenLightRef) => {
  gsap.to(screenLightRef.current, {
    intensity: 3,
    duration: 1,
  });
};

export const screenLightOff = (screenLightRef) => {
  gsap.to(screenLightRef.current, {
    intensity: 0,
    duration: 0.8,
  });
};

export const backgroundSetter = () => {
  document.body.classList.add('background');
};
