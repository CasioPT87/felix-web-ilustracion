import React, { useState, useEffect } from "react";
import { animated, useTrail } from "@react-spring/web";
import { images } from "../../helper/imageLoader";
import { Section } from "../types";
import Pill from '../Pill'
import jumpRules, { JumpRulesSubject, JumpRules } from "./jumpRules";
import "./styles.css";

const NUM_COLUMNS = 3;

const belongsToColumn = (imageIndex: number, jumpRulesSubject: JumpRulesSubject): number => {
  const round = Math.floor(imageIndex / NUM_COLUMNS);
  const imageColumn = imageIndex - round * NUM_COLUMNS;
  const exceptionRule = jumpRulesSubject.find(rule => rule.imageIndex === imageIndex)

  if (exceptionRule) {
    return exceptionRule.belongsToColumn
  } 
    return imageColumn
};

const shouldRender = (belongsToColumn: number, column: number): Boolean => {
  return belongsToColumn === column
};

const ImagesSection = ({ folderName, pillText }: { folderName: Section, pillText: string }) => {
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
      <Pill top='6em'><p>{pillText}</p></Pill>
      <div className="grid-container">
        {new Array(NUM_COLUMNS).fill(0).map((each, indexColumn) => (
          <div className="children-row">
            {trails.map((style, indexImage) => {
              if (!shouldRender(belongsToColumn(indexImage, jumpRules[folderName]), indexColumn)) return null;
              return (
                <animated.div key={indexImage} className="children" style={style}>
                  <img
                    src={sectionImages[indexImage]}
                    onClick={() =>
                      setFullScreenImgSelected(sectionImages[indexImage])
                    }
                    alt="Felix Moreno ilustracion"
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
          alt="Felix Moreno"
        />
      )}
    </div>
  );
};

export default ImagesSection;
