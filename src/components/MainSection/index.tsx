import React, { useState, useEffect } from "react";
import "./styles.css";
import { images } from '../../helper/imageLoader'
import { getSortedPaths } from "../../helper/utils";

const mainSectionImages = Object.values(images.ilustraciones) as any[]

const sortedImages = getSortedPaths(mainSectionImages) as any[]

const Section = () => {

  return (
    <div className="photo-container-ilustraciones">
      {sortedImages.map((src, index) => (
        <img
          key={index}
          src={src}
          className="photo-ilustraciones"
        />
      ))}
    </div>
  );
};

export default Section;
