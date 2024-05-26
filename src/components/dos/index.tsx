import React, { useState, useEffect } from "react";
import "./dos.css";
import { animated, useTrail } from "@react-spring/web";

function importAll(r: any) {
  let images = {} as any;
  (r as any).keys().map((item: any) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const imagesObj = importAll(
  (require as any).context(
    "../../static/informatica",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const isHorizontal = (img: { width: number; height: number }): Boolean => {
  return (img.width / img.height) > 1.5;
};

const Dos = () => {

  const [imageShapeMap, setImageShapeMap]: any = useState({});
  const images: string[] = Object.values(imagesObj);

  const trails = useTrail(images.length, {
    from: { y: 2000 },
    to: { y: 0 },
    delay: 1000,
  });

  return (
    <div className="wrapper">
      <h2>Esto es la pagina dos</h2>
      <div className="grid-container">
        {trails.map((style, index) => (
          <animated.div key={index} className={`children ${imageShapeMap[index] ? "horizontal" : "vertical"}`} style={style}>
            <img
              onLoad={(imgObj) => {
                const target = imgObj.target as HTMLImageElement
                setImageShapeMap((map: any) => ({
                  ...map,
                  [index]: isHorizontal(target),
                }));
              }}
              src={images[index]}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default Dos;
