import React from "react";
import books from "../../static/perfil/libros.png";
import felix from "../../static/perfil/felix.jpg";
import "./styles.css";

const Profile = () => {
  return (
    <div className="perfil-container">
      <div className="perfil-column">
        <img src={felix} />
      </div>
      <div className="perfil-column">
        sdflkjsdflkjsdflkjsdflkjsdlfkjsdlfkjsdklfjsdlkfjsdlfkjsdlfkj
        <img src={books} />
        dklshfjd;aslfkj;dfkjd;ashfjd;askfjh;sdkh
      </div>
    </div>
  );
};

export default Profile;
