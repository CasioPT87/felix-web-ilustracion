import React from "react";
import books from "../../static/perfil/libros.png";
import felix from "../../static/perfil/felix.jpg";
import "./styles.css";

const Profile = () => {
  return (
    <div className={`perfil-container `}>
      <div className="perfil-column">
        <img src={felix} className="felix" />
      </div>
      <div className="perfil-column">
        <div className="perfil-text-wrapper">
          <>
            Nací en 1970. Soy licenciado en Ciencias Biológicas por la UAM.{" "}
            <br></br>
            Mi primer trabajo “serio” fue para una auditora medioambiental
            llamada Interlab, como técnico de medio ambiente. <br></br>
            Sin embargo, mi camino quedó completamente ligado al mundo de la
            educación cuando comencé a trabajar, en 1997, en la editorial SM
            como editor técnico de ciencias naturales. <br></br>
            Al término del contrato, en 1999, preparé un book con infografías y
            me puse en contacto con el departamento de diseño e ilustración de
            la editorial. <br></br>
            Mi trabajo les gustó y comencé a trabajar como freelance realizando
            ilustraciones para los libros de texto de ciencias. <br></br>
            Por otra parte, en el año 2000, fui coautor, junto a Juan Ignacio
            Medina Crespo, de algunos libros de la colección El Barco de Vapor
            Saber.
          </>
          <img src={books} className="text-ilustration" />
          <></>
          Eran unos pequeños libros de divulgación que buscaban promover el
          interés por el mundo de la ciencia, las artes y la cultura en los
          alumnos y alumnas de primaria y secundaria. <br></br>
          Tuvieron tres ediciones y, como curiosidad, también fueron traducidos
          al coreano. <br></br>
          Escribir estos libros, junto a Juan Ignacio, fue una experiencia muy
          interesante y divertida que me permitió entrar, aunque durante menos
          tiempo del que hubiera deseado, en el mundo de la divulgación
          científica, un pilar educativo que debería estar mucho más presente en
          el ámbito de la educación formal.<br></br>
          Con posterioridad, fui ampliando mis clientes. A lo largo de estos
          años, aunque mi principal cliente ha sido el grupo SM (incluida su
          vertiente hispanoamericana), también he colaborado con otras
          editoriales como Edelvives, Oxford University Press, Summa Cultural y,
          sobre todo, Santillana. <br></br>
          Fuera del mundo editorial, he realizado trabajos puntuales para la
          Fundación Aranjuez Natural, el Centro de Interpretación del Lago
          Sanabria y JC Design. <br></br>
          No solamente he creado ilustraciones. También he realizado retoque
          fotográfico, interactivos para páginas web con Adobe Flash y
          Javascript, vídeos de animación con modelado 3D, animación tradicional
          y edición de vídeo. <br></br>A partir de 2017, mi trabajo se enfocó
          más en la animación 3D y la edición de vídeo. De 2019 a 2023, he
          trabajado para Santillana como editor externo de contenidos digitales,
          aunque lo he seguido compaginando con la ilustración y los contenidos
          multimedia.
        </div>
      </div>
    </div>
  );
};

export default Profile;
