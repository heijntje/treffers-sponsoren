import React from "react";
import SponsorBlock from "./sponsorblock";

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
