import React from "react";
import monkey from "../../static/contacto/monkey.jpg";
import Pill from "../Pill";
import "./styles.css";

const Contact = function() {
  return (
    <>
      <Pill top='6em'><p>Contacto</p></Pill>
      <div className="contact-container">
        <div className="contact-column">moreno.felix@gmail.com</div>
        <div className="contact-column">
          <img src={monkey} className="monkey" />
        </div>
        <div className="contact-column">+34 699 86 79 51</div>
      </div>
    </>
  );
};

export default Contact;
