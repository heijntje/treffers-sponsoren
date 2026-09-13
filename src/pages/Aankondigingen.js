/**
 * @file Aankondigingen.js
 * @description Page component for displaying general announcements based on a passed image name.
 */

import React from "react";

/**
 * Aankondigingen component.
 * Sets the background to the specified image to show an announcement.
 *
 * @param {Object} props - The component props.
 * @param {string} props.imageName - The filename of the background image to display.
 * @returns {JSX.Element} The rendered announcement page.
 */
const Aankondigingen = ({ imageName }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/${imageName})`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };
  return <div style={divStyle}></div>;
};

export default Aankondigingen;
