import React from "react";
import { images } from "../../helper/imageLoader";
import Pill from '../Pill'
import "./styles.css";

const imagesPortada = Object.values(images.portada);

const Home = () => {
  return (
    <div className="photo-container-wrapper">
      <Pill top='40%'><p>Felix Moreno Arrastio</p></Pill>
      <div className="photo-container">
        {imagesPortada.map((src, index) => (
          <img key={index} src={src} className="photo" />
        ))}
      </div>
    </div>
  );
};

export default Home;
