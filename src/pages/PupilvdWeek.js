import React from "react";

const PupilvdWeek = () => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_pupilvdweek.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };
  return <div style={divStyle}></div>;
};

export default PupilvdWeek;
