import React, { useState, useEffect } from "react";
import "./styles.css";
import { animated, useTrail } from "@react-spring/web";
import { images } from '../../helper/imageLoader'

const isHorizontal = (img: { width: number; height: number }): Boolean => {
  return (img.width / img.height) > 1.5;
};

const ImagesSection = ({ folderName }: { folderName: 'informatica'}) => {

  const [imageShapeMap, setImageShapeMap]: any = useState({});
  const [sectionImages, setSectionImages] = useState([]);
  // const images: string[] = Object.values(imagesObj);

  const trails = useTrail(sectionImages.length, {
    from: { y: 2000 },
    to: { y: 0 },
    delay: 1000,
  });

  useEffect(() => {
    if (images[folderName]) {
      const imagesToSet = Object.values(images[folderName]) as any
      setSectionImages(imagesToSet);
  } else {
      console.error('Folder not found:', folderName);
      setSectionImages([]);
  }
}, [folderName, images]);

  if (!sectionImages.length) return null

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
              src={sectionImages[index]}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default ImagesSection;
