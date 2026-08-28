import React, { useEffect, useState } from 'react';

import gsap from 'gsap';
import { Html } from '@react-three/drei';

export default function AboutMe({ visible, infoPagesVisited }) {
  const [htmlElement, setHtmlElement] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (htmlElement && htmlElement.parentElement) {
      htmlElement.parentElement.style.pointerEvents = 'none';
    }
  }, [htmlElement]);

  useEffect(() => {
    if (visible) {
      showPanel();
    } else {
      hidePanel();
    }
  }, [visible]);

  const showPanel = () => {
    gsap.to(htmlElement, {
      opacity: 1,
      delay: infoPagesVisited ? 2 : 3.5,
      duration: 1.5,
      onStart: () => {
        htmlElement!.style.display = 'block';
      },
    });
  };

  const hidePanel = () => {
    if (htmlElement) {
      gsap.to(htmlElement, {
        opacity: 0,
        duration: 1.5,
        onStart: () => {
          htmlElement!.style.pointerEvents = 'none';
        },
        onComplete: () => {
          htmlElement!.style.display = 'none';
        },
      });
    }
  };

  return (
    <Html
      visible={visible}
      ref={setHtmlElement}
      style={{ opacity: 0, pointerEvents: 'none' }}
      prepend
      transform
      position={[0.1, 1.8, 0]}
      rotation={[-Math.PI * 0.08, 0, 0]}
      scale={[0.2, 0.2, 0.2]}
    >
      <div className="mt-5 pt-5 titilium-web">
        <div className="container-fluid mt-5 pt-5 text-white">
          <div className="d-flex flex-column mt-5 align-items-center">
            <div className="d-flex col-sm-4 justify-content-center">
              <div className="mt-3 pt-3">
                <img
                  // src="https://via.placeholder.com/400x400"
                  src="/images/image.png"
                  alt="client-image"
                  className="img-fluid rounded-circle rounded-image"
                ></img>
              </div>
            </div>
            <div className="d-flex col-sm-6 flex-column align-content-between client-info-col mt-5">
              <div className="">
                <p className="lead" style={{ textAlign: 'justify' }}>
                  Salom, Mening ismim{' '}
                  <strong style={{ color: '#ffff01' }}>Begzod Abdinazarov.</strong>{' '}
                  Men tezkor, moslashuvchan va vizual jihatdan chiroyli veb-ilovalar yaratishga ishtiyoqli Full Stack veb-dasturchisiman.
                </p>
                <p className="lead" style={{ textAlign: 'justify' }}>
                  Sohada ko'p yillik tajribam bilan, men g'oyalarni funktsional va chiroyli veb-saytlarga aylantirish qiyinchiliklaridan zavqlanaman. Men haqiqiy foydalanuvchi ehtiyojlarini qondiradigan amaliy yechimlarga e'tibor qarataman.
                </p>
                <p className="lead" style={{ textAlign: 'justify' }}>
                  Siga nimada yordam bera olishimni{' '}
                  <strong style={{ color: '#ffff01' }}>Tajriba</strong> Men haqimda 
                  bilish uchun "Konikmalar " bo'lmiga kiring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}
