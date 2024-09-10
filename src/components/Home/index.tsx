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
        <li className="text__first">Ilustracion</li>
        <li className="text__second">Edicion</li>
      </ul>
      <div className="photo-container">
        {imagesPortada.map((src, index) => (
          <img key={index} src={src} className="photo" />
        ))}
      </div>
      <ul className="text right">
        <li className="text__third">Animacion</li>
        <li className="text__fourth">Edicion de video</li>
      </ul>
    </div>
  );
};

export default Home;
