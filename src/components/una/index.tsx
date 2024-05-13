import React from "react";
import Modal from "react-modal";
import "./una.css";
import { animated, useTrail } from "@react-spring/web";

function importAll(r: any) {
  let images = {} as any;
  (r as any).keys().map((item: any, index: number) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const imagesObj = importAll(
  (require as any).context(
    "../../static/informatica",
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const Una = () => {
  const images: string[] = Object.values(imagesObj);

  const [imageInModal, setImageInModal]: any = React.useState(null);

  const trails = useTrail(images.length, {
    from: { y: 2000 },
    to: { y: 0 },
    delay: 1000,
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "80%"
    },
  };

  function openModal(image: string) {
    setImageInModal(image);
  }

  Modal.setAppElement("#root");

  return (
    <div className="wrapper">
      <h2>Esto es la pagina una</h2>
      <div className="grid-container">
        {trails.map((style, index) => (
          <animated.div
            key={index}
            className="children"
            style={style}
            onClick={() => openModal(images[index])}
          >
            <img src={images[index]} alt={`Image ${index}`} />
          </animated.div>
        ))}
        <Modal
          isOpen={!!imageInModal}
          onRequestClose={() => setImageInModal(null)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <img src={imageInModal} alt='whatever' />
        </Modal>
      </div>
    </div>
  );
};

export default Una;
