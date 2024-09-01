import React from "react";
import "./styles.css";
import { images } from "../../helper/imageLoader";
import { getSortedPaths } from "../../helper/utils";
import { MainSection } from "../types";
import Pill from "../Pill";
import InfoText from '../InfoText'
import Text from "../Text";
import gifPortada from "../../static/videos/seccionVideosFondo.gif";

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
      <div>
        <Pill top="6em">
          <p>{pillText}</p>
        </Pill>
        <InfoText text={ <Text section={type} /> }/>
        <div className="photo-container-ilustraciones-wrapper">
          <div className="photo-container-ilustraciones">
            {sortedImages.map((src, index) => (
              <img key={index} src={src} className="photo-ilustraciones" />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (type === "videos") {
    return (
      <>
        <Pill top="6em">
          <p>{pillText}</p>
        </Pill>
        <InfoText text={ <Text section={type} />}/>
        <div className="gif-wrapper">
          <div className="gif-container">
            <img src={gifPortada} className="videoportada" />
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default Section;
