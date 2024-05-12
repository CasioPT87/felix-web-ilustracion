import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  useTransition,
  useSpring,
  useChain,
  animated,
  useSpringRef,
  useTrail,
  useSpringValue,
  useScroll,
  useSprings
} from "@react-spring/web";

// import image from './static/informatica/190158.jpg'

// const data = ["hi", "there!"];

function importAll(r: any) {
  let images = {} as any;
  (r as any).keys().map((item: any, index: number) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  (require as any).context("./static/informatica", false, /\.(png|jpe?g|svg)$/)
);

const getStyle = (width: number, height: number): object => {
  if (width / height > 1) return { gridColumn: "span 2" };
  if (height / width > 1) return { gridRow: "span 2" };
  return {};
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const [springs, api] = useSprings(
    Object.keys(images).length,
    () => ({
      from: { y: 2000 },
      to: { y: 0 },
    }),
    []
  )
  const [imagesSpan, setImagesSpan]: any = useState({});

  const handleImageLoad = (path: string, event: any) => {
    const { naturalWidth, naturalHeight } = event.target;
    const extraStyles = getStyle(naturalWidth, naturalHeight);
    setImagesSpan({
      ...imagesSpan,
      [path]: extraStyles,
    });
  };

  const handleStart = () => {
    api.start()
  }

  return (
    <div className="wrapper">
      <div onClick={handleStart}>vamonos!!</div>
      <div className="grid-container">
        {Object.keys(images).map((imageName, index) => {
          // return <div className="example">hey</div>
          return (
            <animated.div 
              key={index}
              className="children" style={{ ...imagesSpan[imageName], ...springs[index] }}
            >
              <img
                src={images[imageName]}
                onLoad={(event) => handleImageLoad(imageName, event)}
              />
            </animated.div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
