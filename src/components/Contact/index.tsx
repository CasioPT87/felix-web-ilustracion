import React from "react";
import { images } from "../../helper/imageLoader";
import Pill from "../Pill";
import "./styles.css";

const _images: any = images

const Contact = function () {
  return (
    <>
      <Pill top="6em">
        <p>Contacto</p>
      </Pill>
      <div className="contact-container">
        <p>moreno.felix@gmail.com</p>
        <img src={_images.contacto['monkey.jpg']} className="monkey" />
        <p>+34 699 86 79 51</p>
      </div>
    </>
  );
};

export default Contact;
