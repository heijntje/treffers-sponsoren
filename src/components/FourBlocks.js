import React from "react";
import SponsorBlock from "./sponsorblock";

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
