import React, { useState, useEffect } from "react";
import "./styles.css";
import { animated, useTrail } from "@react-spring/web";
import { images } from "../../helper/imageLoader";
import { Section } from "../types";

const NUM_COLUMNS = 4;

const belongsTo = (column: number, index: number): Boolean => {
  const round = Math.floor(index / NUM_COLUMNS);
  return column === index - round * NUM_COLUMNS;
};

const ImagesSection = ({ folderName }: { folderName: Section }) => {
  const [sectionImages, setSectionImages] = useState([]);

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
        <div className="children-row first">
          {trails.map((style, index) => {
            if (!belongsTo(0, index)) return null;
            return (
              <animated.div key={index} className="children" style={style}>
                <img src={sectionImages[index]} />
              </animated.div>
            );
          })}
        </div>
        <div className="children-row second">
          {trails.map((style, index) => {
            if (!belongsTo(1, index)) return null;
            return (
              <animated.div key={index} className="children" style={style}>
                <img src={sectionImages[index]} />
              </animated.div>
            );
          })}
        </div>
        <div className="children-row third">
          {trails.map((style, index) => {
            if (!belongsTo(2, index)) return null;
            return (
              <animated.div key={index} className="children" style={style}>
                <img src={sectionImages[index]} />
              </animated.div>
            );
          })}
        </div>
        <div className="children-row fourth">
          {trails.map((style, index) => {
            if (!belongsTo(3, index)) return null;
            return (
              <animated.div key={index} className="children" style={style}>
                <img src={sectionImages[index]} />
              </animated.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImagesSection;
