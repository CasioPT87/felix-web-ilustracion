import React, { useState } from "react";
import "./styles.css";

const Navigation2D = ({ goTo }: { goTo: any }) => {
  const [open, setOpen] = useState(false);
  function navigateTo(e: any, path: string) {
    e.stopPropagation();
    goTo(path, () => setOpen(false));
  }

  window.onclick = () => {
    setOpen(false)
  }

  return (
    <>
      <img
        src={`${process.env.PUBLIC_URL}/burger.png`}
        className="navigation2D"
        onMouseOver={() => setOpen(true)}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <ul className="navigation2D__menu" onMouseLeave={() => setOpen(false)}>
          <li onClick={(e) => navigateTo(e, "/")}>
            <p>Inicio</p>
          </li>
          <li>
            <p>Vídeos</p>
            <ul className="navigation2D__menu level_1 bottom">
              <li onClick={(e) => navigateTo(e, "/video")}>
                <p>Portada</p>
              </li>
              <li onClick={(e) => navigateTo(e, "/video/animacion3d")}>
                <p>Vídeos 3D</p>
              </li>
              <li onClick={(e) => navigateTo(e, "/video/edicion")}>
                <p>Edición de Vídeo</p>
              </li>
            </ul>
          </li>
          <li>
            <p>Ilustraciones</p>
            <ul className="navigation2D__menu level_1 middle">
              <li onClick={(e) => navigateTo(e, "/ilustracion")}>
                <p>Portada</p>
              </li>
              <li onClick={(e) => navigateTo(e, "/ilustracion/tecnologia")}>
                <p>Tecnología</p>
              </li>
              <li onClick={(e) => navigateTo(e, "/ilustracion/informatica")}>
                <p>Informática</p>
              </li>
              <li
                onClick={(e) =>
                  navigateTo(e, "/ilustracion/geografiaehistoria")
                }
              >
                <p>Geografía e Historia</p>
              </li>
              <li onClick={(e) => navigateTo(e, "/ilustracion/geologia")}>
                <p>Geología</p>
              </li>
              <li onClick={(e) => navigateTo(e, "/ilustracion/biologia")}>
                <p>Biología</p>
              </li>
              <li onClick={(e) => navigateTo(e, "/ilustracion/fisicayquimica")}>
                <p>Física y Química</p>
              </li>
              <li onClick={(e) => navigateTo(e, "/ilustracion/otros")}>
                <p>Otras ilustraciones</p>
              </li>
            </ul>
          </li>
          <li onClick={(e) => navigateTo(e, "/contacto")}>
            <p>Contacto</p>
          </li>
          <li onClick={(e) => navigateTo(e, "/perfil")}>
            <p>Perfil</p>
          </li>
        </ul>
      )}
    </>
  );
};

export default Navigation2D;
