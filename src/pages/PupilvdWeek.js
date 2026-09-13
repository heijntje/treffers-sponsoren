/**
 * @file PupilvdWeek.js
 * @description Page component for displaying the "Pupil van de Week" (Player of the Week).
 */

import React from "react";

/**
 * PupilvdWeek component.
 * Sets the background to the specific Pupil van de Week image.
 *
 * @returns {JSX.Element} The rendered Player of the Week page.
 */
const PupilvdWeek = () => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_pupilvdweek.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };
  return <div style={divStyle}></div>;
};

export default PupilvdWeek;
