import React from "react";
import SponsorBlock from "./sponsorblock";

const EightBlocks = (sources) => {
  const [src1, src2, src3, src4, src5, src6, src7, src8] = sources.sources;

  return (
    <div className="relative w-full h-screen bg-cover bg-center">
      <div className="absolute top-[37vh] left-[5.75vw] w-[18.5vw] h-[22vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src1} />
      </div>
      <div className="absolute top-[37vh] left-[29vw] w-[18.5vw] h-[22vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src2} />
      </div>
      <div className="absolute top-[37vh] right-[29.25vw] w-[18.5vw] h-[22vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src3} />
      </div>
      <div className="absolute top-[37vh] right-[6vw] w-[18.5vw] h-[22vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src4} />
      </div>
      <div className="absolute bottom-[11vh] left-[5.75vw] w-[18.5vw] h-[22vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src5} />
      </div>
      <div className="absolute bottom-[11vh] left-[29vw] w-[18.5vw] h-[22vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src6} />
      </div>
      <div className="absolute bottom-[11vh] right-[29.25vw] w-[18.5vw] h-[22vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src7} />
      </div>
      <div className="absolute bottom-[11vh] right-[6vw] w-[18.5vw] h-[22vh]">
        <SponsorBlock width={"100%"} height={"100%"} src={src8} />
      </div>
    </div>
  );
};

export default EightBlocks;
