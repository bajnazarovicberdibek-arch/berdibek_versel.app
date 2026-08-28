// * LIBRARY IMPORTS
import { useEffect, useRef } from 'react';
import { Html } from '@react-three/drei';
import WordCloud from 'react-wordcloud';
import gsap from 'gsap';

// * CSS IMPORTS
import './fonts.css';

// * PARAMETERS
import { options } from './parameters/options';
import { data } from './parameters/words';

const words = data.map((w) => ({ text: w.key, value: w.value }));

const minSize = [window.innerWidth + 1000, 300];

export default function WordCloudComponent({ isOpen, isPoweredOn, isMobile }) {
  // * WORD CLOUD REF
  const wordCloudHtmlRef = useRef();
  const wordCloudRef = useRef();

  useEffect(() => {
    if (isOpen && !isPoweredOn) {
      displayWords();
    } else {
      hideWords();
    }
  }, [isOpen, isPoweredOn]);

  // * WORD CLOUD METHODS
  const displayWords = () => {
    if (wordCloudHtmlRef.current && wordCloudRef.current) {
      gsap.to(wordCloudHtmlRef.current.style, {
        duration: 3,
        delay: 1.2,
        opacity: 1,
      });

      gsap.to(wordCloudRef.current.style, {
        duration: 3,
        delay: 1.2,
        opacity: 1,
      });
    }
  };

  const hideWords = () => {
    if (wordCloudHtmlRef.current && wordCloudRef.current) {
      gsap.to(wordCloudHtmlRef.current.style, {
        duration: 2,
        opacity: 0,
      });

      gsap.to(wordCloudRef.current.style, {
        duration: 2,
        opacity: 0,
      });
    }
  };

  return isMobile ? null : (
    <Html
      transform
      center
      position-z={-2000}
      rotation-x={-0.25}
      position-y={-300}
      ref={wordCloudHtmlRef}
      scale={150}
      style={{
        opacity: 0,
      }}
    >
      <div ref={wordCloudRef} style={{ opacity: 0 }}>
        <WordCloud words={words} options={options} minSize={minSize} />
      </div>
    </Html>
  );
}
