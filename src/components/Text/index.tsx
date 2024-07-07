import React, { ReactElement } from "react";
import "./styles.css";

const Text = ({ section }: { section: string }) => {
  console.log('section', section)
  return (
    <div className="side-text-column">
      {section === 'videos' && (
        <div>
           Los programas de modelado 3D son herramientas diseñadas tanto para la creación de imágenes fijas como para la producción de escenas animadas. Por lo tanto, basándome en mi experiencia en modelado 3D, me pareció lógico crear vídeos que incluyeran algunas escenas diseñadas para ilustraciones. Para añadir efectos y montar las escenas, es más conveniente utilizar programas de edición de vídeo, lo que me llevó al siguiente paso: la edición de vídeo y la animación convencional.
        </div>
      )}
    </div>
  );
};

export default Text;
