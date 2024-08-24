import React from "react";
import Pill from "../Pill";
import "./styles.css";

const VideosSection = ({ pillText }: { pillText?: string }) => {
  return (
    <>
      <Pill top="6em">
        <p>{pillText}</p>
      </Pill>
      <div className="video-videos-container">
        <div className="video-videos-wrapper">
          <h3>Animacion 3D</h3>
          <p>
            Entre 2013 y 2017, realicé numerosos vídeos mediante modelado 3D
            para la editorial SM. El trabajo consistió principalmente en
            animación 3D, y la edición de vídeo se limitó prácticamente al
            montaje y la transición entre escenas. Este vídeo recopila algunos
            fragmentos de estas animaciones.
          </p>
          <video className="video-videos" controls preload="auto">
            <source
              src={`${process.env.PUBLIC_URL}/assets/videos/video_largo.mp4`}
              type="video/mp4"
            />
            <p>Lo sentimos, tu navegador no soporta videos</p>
          </video>
        </div>
      </div>
    </>
  );
};

export default VideosSection;
