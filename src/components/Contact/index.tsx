import React from "react";
import monkey from "../../static/contacto/monkey.jpg";
import Pill from "../Pill";
import "./styles.css";

const Contact = function () {
  return (
    <>
      <Pill top="6em">
        <p>Contacto</p>
      </Pill>
      <div className="contact-container">
        <p>moreno.felix@gmail.com</p>
        <img src={monkey} className="monkey" />
        <p>+34 699 86 79 51</p>
      </div>
    </>
  );
};

export default Contact;
