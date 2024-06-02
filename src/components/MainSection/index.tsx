import React from "react";
import "./styles.css";
import { images } from "../../helper/imageLoader";
import { getSortedPaths } from "../../helper/utils";
import { MainSection } from "../types";

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
      <div className="video-videos-container">
        <video className="video-videos" controls preload="auto" autoPlay={true} >
          <source src={`${process.env.PUBLIC_URL}/assets/videos/video_largo.mp4`} type="video/mp4" />
          <p>Lo sentimos, tu navegador no soporta videos</p>
        </video>
      </div>
    );
  }
  return null;
};

export default Section;
