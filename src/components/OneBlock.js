import React from "react";
import SponsorBlock from "./sponsorblock";

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
