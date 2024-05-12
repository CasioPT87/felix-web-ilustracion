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
} from "@react-spring/web";

import image1 from './static/informatica/190158.jpg'
import image2 from './static/informatica/366210.jpg'
import image3 from './static/informatica/436720.jpg'
import image4 from './static/informatica/630732.jpg'
import image5 from './static/informatica/266879FelixMorenoT04P58H01.jpg'
import image6 from './static/informatica/366236.jpg'
import image7 from './static/informatica/487606.jpg'
import image8 from './static/informatica/653912.jpg'
import image9 from './static/informatica/309490.jpg'
import image10 from './static/informatica/373515.jpg'
import image11 from './static/informatica/653918.jpg'

const images = [
  image1, 
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11
]

console.log(images[0])

const App = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="wrapper">
      <div className="grid-container">
      {images.map((image, index) => {
        return (
          <img key={index} src={image} alt="jarl" />
        );
      })}
      </div>
      <animated.div
        className="example"
        style={{ opacity: scrollYProgress.get() + 0.5 }}
      >
        {scrollYProgress}
      </animated.div>
    </div>
  );
};

export default App;
