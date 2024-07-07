import React from "react";
import "./styles.css";
import { images } from "../../helper/imageLoader";
import { getSortedPaths } from "../../helper/utils";
import { MainSection } from "../types";
import Pill from "../Pill";
import Text from "../Text";
import gifPortada from "../../static/videos/videosportada.gif";

const mainSectionImages = Object.values(images.ilustraciones) as any[];

const sortedImages = getSortedPaths(mainSectionImages) as any[];

const Section = ({
  type,
  pillText,
}: {
  type: MainSection;
  pillText: string;
}): any => {
  if (type === "images") {
    return (
      <div className="main-section-container">
        <Pill top="6em">
          <p>{pillText}</p>
        </Pill>
        <div className="photo-container-ilustraciones">
          {sortedImages.map((src, index) => (
            <img key={index} src={src} className="photo-ilustraciones" />
          ))}
        </div>
        <Text section={type} />
      </div>
    );
  } else if (type === "videos") {
    return (
      <div className="main-section-container">
        <Pill top="6em">
          <p>{pillText}</p>
        </Pill>
        <div className="gif-wrapper">
          <div className="gif-container">
            <img src={gifPortada} className="videoportada" />
          </div>
        </div>
        <Text section={type} />
      </div>
    );
  }
  return null;
};

export default Section;
