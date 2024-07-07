import React, { ReactElement } from "react";
import "./styles.css";

const Pill = ({ children, top }: { children: ReactElement, top: string }) => {
  return (
    <div className="pill" style={{ top }}>{ children }</div>
  );
};

export default Pill;
