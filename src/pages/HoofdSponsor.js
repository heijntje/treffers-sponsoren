/**
 * @file HoofdSponsor.js
 * @description Page component for displaying the main sponsor (hoofdsponsor) screen.
 */

import React from "react";

/**
 * HoofdSponsor component.
 * Sets the background to the specific hoofdsponsor image.
 *
 * @returns {JSX.Element} The rendered main sponsor page.
 */
const HoofdSponsor = () => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_hoofdsponsor.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };
  return <div style={divStyle}></div>;
};

export default HoofdSponsor;
