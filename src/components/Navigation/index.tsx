import React, { useState } from "react";
import "./styles.css";

const Navigation2D = ({ goTo }: { goTo: any }) => {
  const [open, setOpen] = useState(false);
  function navigateTo(e: any, path: string) {
    console.log('navigate!!!')
    e.stopPropagation()
    goTo(path, () => setOpen(false))
  }

  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/burger.png`} className="navigation2D" onMouseOver={() => setOpen(true)} onClick={() => setOpen(!open)} />
      {open && (
        <ul className="navigation2D__menu" onMouseLeave={() => setOpen(false)}>
          <li onClick={(e) => navigateTo(e, '/')}>
            <p>Inicio</p>
          </li>
          <li>
            <p>Ilustraciones</p>
            <ul className="navigation2D__menu level_1 middle">
              <li onClick={(e) => navigateTo(e, '/ilustracion')}>
                <p>Portada</p>
              </li>
              <li onClick={(e) => navigateTo(e, '/ilustracion/tecnologia')}>
                <p>Tecnologia</p>
              </li>
              <li onClick={(e) => navigateTo(e, '/ilustracion/otros')}>
                <p>Otras ilustraciones</p>
              </li>
              <li onClick={(e) => navigateTo(e, '/ilustracion/informatica')}>
                <p>Informatica</p>
              </li>
              <li onClick={(e) => navigateTo(e, '/ilustracion/geografiaehistoria')}>
                <p>Geografia e Historia</p>
              </li>
              <li onClick={(e) => navigateTo(e, '/ilustracion/geologia')}>
                <p>Geologia</p>
              </li>
              <li onClick={(e) => navigateTo(e, '/ilustracion/biologia')}>
                <p>Biologia</p>
              </li>
            </ul>
          </li>
          <li>
            <p>Videos</p>
            <ul className="navigation2D__menu level_1 bottom">
              <li onClick={(e) => navigateTo(e, '/video')}>
                <p>Portada</p>
              </li>
              <li onClick={(e) => navigateTo(e, '/video/animacion3d')}>
                <p>Videos 3D</p>
              </li>
              <li onClick={(e) => navigateTo(e, '/video/edicion')}>
                <p>Edicion de Video</p>
              </li>
            </ul>
          </li>
          <li onClick={(e) => navigateTo(e, '/contacto')}>
            <p>Contacto</p>
          </li>
          <li onClick={(e) => navigateTo(e, '/perfil')}>
            <p>Perfil</p>
          </li>
        </ul>
      )}
    </>
  );
};

export default Navigation2D;
