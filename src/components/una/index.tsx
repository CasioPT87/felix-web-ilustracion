import React from "react";
import "./una.css";
import {
  animated,
  useTrail,
} from "@react-spring/web";

function importAll(r: any) {
  let images = {} as any;
  (r as any).keys().map((item: any, index: number) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const imagesObj = importAll(
  (require as any).context("../../static/informatica", false, /\.(png|jpe?g|svg)$/)
);

const Una = () => {
  const images: string[] = Object.values(imagesObj)
  
  const trails = useTrail(images.length, {
    from: { y: 2000 },
    to: { y: 0 },
    delay: 1000
  });

  return (
    <div className="wrapper">
      <h2>Esto es la pagina una</h2>
      <div className="grid-container">
        {trails.map((style, index) => (
          <animated.div key={index} className="children" style={style}>
            <img src={images[index]} alt={`Image ${index}`} />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default Una;
