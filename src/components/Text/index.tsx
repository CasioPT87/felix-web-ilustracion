import React, { ReactElement } from "react";
import "./styles.css";

const Text = ({ section }: { section: string }) => {
  return (
    <div className="text-wrapper">
      {section === "videos" && (
        <div className="info-pill-text">
          Los programas de modelado 3D son herramientas diseñadas tanto para la
          creación de imágenes fijas como para la producción de escenas
          animadas. Por lo tanto, basándome en mi experiencia en modelado 3D, me
          pareció lógico crear vídeos que incluyeran algunas escenas diseñadas
          para ilustraciones. Para añadir efectos y montar las escenas, es más
          conveniente utilizar programas de edición de vídeo, lo que me llevó al
          siguiente paso: la edición de vídeo y la animación convencional.
        </div>
      )}
      {section === "images" && (
        <div className="info-pill-text">
          Un factor, creo, determinante para entrar a trabajar en la editorial
          SM fue que, habitualmente, a los editores les resulta difícil explicar
          a los ilustradores los conceptos científicos que deben ser
          representados en los dibujos. Indicar qué se debe destacar, la forma
          de objetos microscópicos, los colores habituales que se utilizan, etc.
          Estas cuestiones hacen que, a menudo, un dibujo tenga que pasar por
          varias correcciones que ralentizan el flujo de trabajo y, a veces,
          complican la relación editor-dibujante. En mi caso, mis bocetos,
          bastante detallados, simplificaban el proceso y, una vez que me pasé
          al mundo de la ilustración, la ventaja pasó al otro lado de la
          ecuación. A los editores les resulta fácil trabajar conmigo porque no
          tienen que darme gran cantidad de explicaciones más allá de concretar
          la estructura en la página o el estilo de la ilustración.
        </div>
      )}
    </div>
  );
};

export default Text;
