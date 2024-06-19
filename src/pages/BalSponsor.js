import React from "react";
import OneBlock from "../components/OneBlock";

const BalSponsor = () => {
  const divStyle = {
    backgroundImage: `url(/scherm_balsponsor.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };

  return (
    <div style={divStyle}>
      <OneBlock source="/balsponsor.png" />
    </div>
  );
};

export default BalSponsor;
