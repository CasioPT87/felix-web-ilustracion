import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import gifPortada from '../../static/videos/videosportada.gif'
import './styles.css'

const VideosSection = () => {
  return (
    <div className="gif-container">
        <img
          src={gifPortada}
          className="videoportada"
        />
    </div>
  );
};

export default VideosSection;
