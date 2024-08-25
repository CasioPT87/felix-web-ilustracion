import React, { useState, ReactElement } from "react";
import "./styles.css";

const InfoPill = ({ text }: { text?: ReactElement }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="infoPill" onClick={() => setOpen(!open)}>
        <span className="infoPill__content">+</span>
      </div>
      {open && text}
    </>
  );
};

export default InfoPill;
