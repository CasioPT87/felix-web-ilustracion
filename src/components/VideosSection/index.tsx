import React from "react";
import "./styles.css";

const VideosSection = () => {
  return (
    <div className="video-videos-container">
      <video className="video-videos" controls preload="auto" autoPlay={true} >
        <source src={`${process.env.PUBLIC_URL}/assets/videos/video_largo.mp4`} type="video/mp4" />
        <p>Lo sentimos, tu navegador no soporta videos</p>
      </video>
    </div>
  );
};

export default VideosSection;
