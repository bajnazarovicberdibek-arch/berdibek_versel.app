import React, { useEffect, useRef, useState } from 'react';
import { backgroundSetter } from '../../Utils/utils';

export default function LoadingScreen() {
  const screenRef = useRef(null);

  const [fontSize, setFontSize] = useState('20px');

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    backgroundSetter();
    writeMessage();
  }, []);

  // * HELPER METHODS
  const resize = () => {
    setFontSize(`${window.innerWidth / 38}px`);
  };

  const TerminalEmulator = {
    init: function (screen) {
      this.screen = screen;
      this.createInput();
    },

    createInput: function () {
      const inputField = document.createElement('div');
      const inputWrap = document.createElement('div');

      inputField.className = 'terminal_emulator__field';
      inputField.innerHTML = '';
      inputWrap.appendChild(inputField);
      this.screen.appendChild(inputWrap);
      this.field = inputField;
      this.fieldwrap = inputWrap;
    },

    enterInput: function (input) {
      return new Promise((resolve, reject) => {
        const randomSpeed = (max, min) => {
          return Math.random() * (max - min) + min;
        };

        let speed = randomSpeed(25, 25);
        let i = 0;
        let str = '';
        const type = () => {
          str = str + input[i];
          this.field.innerHTML = str.replace(/ /g, '&nbsp;');
          i++;

          setTimeout(() => {
            if (i < input.length) {
              if (i % 5 === 0) speed = randomSpeed(40, 40);
              type();
            } else {
              setTimeout(() => {
                resolve();
              }, 400);
            }
          }, speed);
        };

        type();
      });
    },

    enterCommand: function () {
      return new Promise((resolve, reject) => {
        const resp = document.createElement('div');
        resp.className = 'terminal_emulator__command';
        resp.innerHTML = this.field.innerHTML;
        this.screen.insertBefore(resp, this.fieldwrap);

        this.field.innerHTML = '';
        resolve();
      });
    },

    enterResponse: function (response) {
      return new Promise((resolve, reject) => {
        const resp = document.createElement('div');
        resp.className = 'terminal_emulator__response';
        resp.innerHTML = response;
        this.screen.insertBefore(resp, this.fieldwrap);

        resolve();
      });
    },

    wait: function (time, busy) {
      busy = busy === undefined ? true : busy;
      return new Promise((resolve, reject) => {
        if (busy) {
          this.field.classList.add('waiting');
        } else {
          this.field.classList.remove('waiting');
        }
        setTimeout(() => {
          resolve();
        }, time);
      });
    },

    reset: function () {
      return new Promise((resolve, reject) => {
        this.field.classList.remove('waiting');
        resolve();
      });
    },
  };

  const writeMessage = () => {
    const TE = Object.create(TerminalEmulator);
    TE.init(screenRef.current);

    TE.wait(1000, false)
      .then(() => TE.enterInput('portfolio.AppImage'))
      .then(() => TE.enterCommand())
      .then(() => TE.enterResponse('Loading Portfolio...'))
      .then(() => TE.wait(0))
      .then(() => TE.enterResponse(''))
      .then(() => TE.wait(800))
      .then(() => TE.enterResponse('- Loading Lighting...'))
      .then(() => TE.wait(300))
      .then(() => TE.enterResponse('- Loading Notebook...'))
      .then(() => TE.wait(300))
      .then(() => TE.enterResponse('- Loading Sounds...'))
      .then(() => TE.wait(300))
      .then(() => TE.enterResponse('- Loading LinkedIn Profile...'))
      .then(() => TE.wait(300))
      .then(() => TE.enterResponse('- Loading Github Profile...'))
      .then(() => TE.wait(300))
      .then(() =>
        TE.enterResponse(
          '- Putting out fire and smoke coming out of the notebook...'
        )
          .then(() => TE.wait(0))
          .then(() => TE.enterResponse(''))
          .then(() => TE.enterResponse('Initializing...'))
      );
  };

  return (
    <div className={`loading-screen`}>
      <div
        ref={screenRef}
        className="terminal_emulator"
        id="screen"
        style={{ fontSize: fontSize }}
      ></div>
    </div>
  );
}
