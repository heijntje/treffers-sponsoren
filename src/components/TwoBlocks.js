/**
 * @file TwoBlocks.js
 * @description Layout component for displaying 2 sponsor logos in a 1x2 grid format.
 */

import React from "react";
import SponsorBlock from "./sponsorblock";

/**
 * TwoBlocks component.
 * Renders a 2-block layout for sponsor logos.
 *
 * @param {Object} props - The component props.
 * @param {Array<string>} props.sources - Array of 2 image source URLs for the blocks.
 * @returns {JSX.Element} The rendered layout.
 */
const TwoBlocks = (sources) => {
  const [src1, src2] = sources.sources;

  return (
    <div className="relative w-full h-screen bg-cover bg-center">
      <div className="absolute top-[42vh] left-[4vw] w-[44vw] h-[42vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src1} />
      </div>
      <div className="absolute top-[42vh] right-[4vw] w-[44vw] h-[42vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src2} />
      </div>
    </div>
  );
};

export default TwoBlocks;
