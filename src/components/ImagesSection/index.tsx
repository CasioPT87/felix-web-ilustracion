import React, { useState, useEffect } from "react";
import "./styles.css";
import { animated, useTrail } from "@react-spring/web";
import { images } from "../../helper/imageLoader";
import { Section } from "../types";

const NUM_COLUMNS = 3;

const belongsTo = (column: number, index: number): Boolean => {
  const round = Math.floor(index / NUM_COLUMNS);
  return column === index - round * NUM_COLUMNS;
};

const ImagesSection = ({ folderName }: { folderName: Section }) => {
  const [sectionImages, setSectionImages] = useState([]);
  const [fullScreenImgSelected, setFullScreenImgSelected] = useState(null);

  const trails = useTrail(sectionImages.length, {
    from: { y: 2000 },
    to: { y: 0 },
    delay: 1000,
  });

  useEffect(() => {
    if (images[folderName]) {
      const imagesToSet = Object.values(images[folderName]) as any;
      setSectionImages(imagesToSet);
    } else {
      console.error("Folder not found:", folderName);
      setSectionImages([]);
    }
  }, [folderName]);

  if (!sectionImages.length) return null;

  return (
    <div className="wrapper">
      <div className="grid-container">
        {new Array(NUM_COLUMNS).fill(0).map((each, _index) => (
          <div className="children-row">
            {trails.map((style, index) => {
              if (!belongsTo(_index, index)) return null;
              return (
                <animated.div key={index} className="children" style={style}>
                  <img
                    src={sectionImages[index]}
                    onClick={() =>
                      setFullScreenImgSelected(sectionImages[index])
                    }
                  />
                </animated.div>
              );
            })}
          </div>
        ))}
      </div>
      {fullScreenImgSelected && (
        <img
          className="fullScreenImage"
          src={fullScreenImgSelected}
          onClick={() => setFullScreenImgSelected(null)}
        />
      )}
    </div>
  );
};

export default ImagesSection;
