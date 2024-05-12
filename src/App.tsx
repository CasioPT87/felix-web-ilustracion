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

console.log(images);

const App = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="wrapper">
      {Object.keys(images).map((imageName, index) => {
        console.log(images[imageName])
        return (
          <img key={index} src={images[imageName]} alt={imageName} />
        );
      })}
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
