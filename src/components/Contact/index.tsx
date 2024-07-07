import React from "react";
import monkey from "../../static/contacto/monkey.jpg";
import "./styles.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-column">
        <img src={monkey} className="monkey" />
      </div>
      <div className="contact-column">
        <div className="contact-text-wrapper">
          <>
            Soy un gnomo Y aquí en el bosque, soy feliz<br></br>
            Bajo un árbol, vivo yo,<br></br>
            junto a su raíz <br></br>
            Soy un gnomo<br></br>
            Y simplemente con mirar <br></br>
            Todo lo que piensas tú<br></br>
            podré adivinar<br></br>
          </>
        </div>
      </div>
    </div>
  );
};

export default Contact;
