/**
 * @file FourBlocks.js
 * @description Layout component for displaying 4 sponsor logos in a 2x2 grid format.
 */

import React from "react";
import SponsorBlock from "./sponsorblock";

/**
 * FourBlocks component.
 * Renders a 4-block layout for sponsor logos.
 *
 * @param {Object} props - The component props.
 * @param {Array<string>} props.sources - Array of 4 image source URLs for the blocks.
 * @returns {JSX.Element} The rendered layout.
 */
const FourBlocks = (sources) => {
  const [src1, src2, src3, src4] = sources.sources;

  return (
    <div className="relative w-full h-screen bg-cover bg-center">
      <div className="absolute top-[39vh] left-[6vw] w-[40vw] h-[19vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src1} />
      </div>
      <div className="absolute top-[39vh] right-[6vw] w-[40vw] h-[19vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src2} />
      </div>
      <div className="absolute bottom-[12vh] left-[6vw] w-[40vw] h-[19vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src3} />
      </div>
      <div className="absolute bottom-[12vh] right-[6vw] w-[40vw] h-[19vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src4} />
      </div>
    </div>
  );
};

export default FourBlocks;
