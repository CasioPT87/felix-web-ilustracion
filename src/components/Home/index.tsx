import React from "react";
import { images } from "../../helper/imageLoader";
import Pill from "../Pill";
import "./styles.css";

const imagesPortada = Object.values(images.portada);

const Home = () => {
  return (
    <div className="photo-container-wrapper">
      <Pill top="6em">
        <p>Félix Moreno Arrastio</p>
      </Pill>
      <ul className="text left">
        <li className="text__first">Ilustración</li>
        <li className="text__second">Edición</li>
      </ul>
      <div className="photo-container">
        {imagesPortada.map((src, index) => (
          <img key={index} src={src} className="photo" />
        ))}
      </div>
      <ul className="text right">
        <li className="text__third">Animación</li>
        <li className="text__fourth">Edición de vídeo</li>
      </ul>
    </div>
  );
};

export default Home;
