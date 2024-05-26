import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { images } from '../../helper/imageLoader'
import './styles.css'

const imagesPortada = Object.values(images.portada)

const Home = () => {
  return (
    <div className="photo-container">
      {imagesPortada.map((src, index) => (
        <img
          key={index}
          src={src}
          className="photo"
        />
      ))}
    </div>
  );
};

export default Home;
