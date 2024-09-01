import React from "react";
import { images } from "../../helper/imageLoader";
import Pill from "../Pill";
import "./styles.css";

const imagesPortada = Object.values(images.portada);

const Home = () => {
  return (
    <div className="photo-container-wrapper">
      <Pill top="6em">
        <p>Felix Moreno Arrastio</p>
      </Pill>
      <ul className="text left">
        <li>Felix Moreno Arrastio</li>
      </ul>
      <div className="photo-container">
        {imagesPortada.map((src, index) => (
          <img key={index} src={src} className="photo" />
        ))}
      </div>
      <ul className="text right">
        <li>Ilustracion</li>
        <li>Edicion</li>
        <li>Animacion</li>
        <li>Edicion de video</li>
      </ul>
    </div>
  );
};

export default Home;
