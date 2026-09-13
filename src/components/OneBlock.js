/**
 * @file OneBlock.js
 * @description Layout component for displaying a single prominent sponsor logo.
 */

import React from "react";
import SponsorBlock from "./sponsorblock";

/**
 * TwoBlocks (OneBlock) component.
 * Note: despite the name TwoBlocks, it renders a single block layout.
 *
 * @param {Object} props - The component props.
 * @param {string} props.source - The image source URL for the single block.
 * @returns {JSX.Element} The rendered layout.
 */
const TwoBlocks = ({ source }) => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center flex justify-center">
      <div className="absolute top-[21vh] w-[75vw] h-[70vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={source} />
      </div>
    </div>
  );
};

export default TwoBlocks;
