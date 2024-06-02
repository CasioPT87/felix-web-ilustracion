import React from "react";
import "./styles.css";
import { images } from "../../helper/imageLoader";
import { getSortedPaths } from "../../helper/utils";
import { MainSection } from "../types";
import gifPortada from '../../static/videos/videosportada.gif'

const mainSectionImages = Object.values(images.ilustraciones) as any[];

const sortedImages = getSortedPaths(mainSectionImages) as any[];

const Section = ({ type }: { type: MainSection }): any => {
  if (type === "images") {
    return (
      <div className="photo-container-ilustraciones">
        {sortedImages.map((src, index) => (
          <img key={index} src={src} className="photo-ilustraciones" />
        ))}
      </div>
    );
  } else if (type === "videos") {
    return (
      <div className="gif-container">
      <img
        src={gifPortada}
        className="videoportada"
      />
  </div>
    )
  }
  return null;
};

export default Section;
