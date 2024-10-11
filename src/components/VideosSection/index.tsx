import React from "react";
import Pill from "../Pill";
import { images } from '../../helper/imageLoader'
import "./styles.css";

const _images: any = images

const VideosSection = ({
  pillText,
  type,
}: {
  pillText?: string;
  type: "3d" | "edicion";
}) => {
  return (
    <>
      <Pill top="6em">
        <p>{pillText}</p>
      </Pill>
      <div className="video-videos-container">
        <div className="video-videos-wrapper">
          {type === "3d" && (
            <>
              <h3>Animación 3D</h3>
              <p>
                Entre 2013 y 2017, realicé numerosos vídeos mediante modelado 3D
                para la editorial SM. El trabajo consistió principalmente en
                animación 3D, y la edición de vídeo se limitó prácticamente al
                montaje y la transición entre escenas. Este vídeo recopila
                algunos fragmentos de estas animaciones.
              </p>
              <video className="video-videos" controls preload="auto" poster={_images.videosPortada['video3d.png']}>
                <source
                  src={`${process.env.PUBLIC_URL}/assets/videos/video_largo.mp4`}
                  type="video/mp4"
                />
                <p>Lo sentimos, tu navegador no soporta videos</p>
              </video>
            </>
          )}
          {type === "edicion" && (
            <>
              <div>
                <h3>Edición de video</h3>
                <p>
                  Desde 2018, he colaborado con Santillana en la edición y
                  montaje de multitud de vídeos. En algunos casos, he incluido
                  escenas animadas mediante modelado 3D, pero principalmente el
                  trabajo ha consistido en montar vídeos e imágenes de agencia,
                  preparar esquemas, añadir rotulaciones y realizar animación
                  convencional.
                </p>
                <video className="video-videos" controls preload="auto" poster={_images.videosPortada['video1.png']}>
                  <source
                    src={`${process.env.PUBLIC_URL}/assets/videos/edicionDeVideo.mp4`}
                    type="video/mp4"
                  />
                  <p>Lo sentimos, tu navegador no soporta videos</p>
                </video>
              </div>

              <div>
                <h3>Felicitación</h3>
                <p>
                  Durante este periodo, Santillana me encargó la realización de
                  las cortinillas de entrada de los vídeos. Son más de 60
                  pequeños vídeos animados que identifican la temática que se va
                  a tratar. Este vídeo es una felicitación de Navidad, al estilo
                  de las cortinillas, que preparé en 2020 jugando con el hecho
                  de que Isaac Newton nació el 25 de diciembre de 1642, según el
                  calendario juliano.
                </p>
                <video className="video-videos" controls preload="auto" poster={_images.videosPortada['video2.png']}>
                  <source
                    src={`${process.env.PUBLIC_URL}/assets/videos/felicitacion2020.mp4`}
                    type="video/mp4"
                  />
                  <p>Lo sentimos, tu navegador no soporta videos</p>
                </video>
              </div>

              <div>
                <h3>Vídeo de Música</h3>
                <p>
                  Aunque la mayoría de los vídeos que he editado corresponden a
                  las asignaturas de biología, geología y física, también he
                  realizado varios vídeos para la asignatura de música. Son
                  vídeos a los que tengo un especial cariño, ya que consistían
                  en animar imágenes de otros ilustradores.
                </p>
                <video className="video-videos" controls preload="auto"  poster={_images.videosPortada['video3.png']}>
                  <source
                    src={`${process.env.PUBLIC_URL}/assets/videos/videosMusica.mp4`}
                    type="video/mp4"
                  />
                  <p>Lo sentimos, tu navegador no soporta videos</p>
                </video>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VideosSection;
