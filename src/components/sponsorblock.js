import React from "react";
import "tailwindcss/tailwind.css"; // make sure to import tailwind css
import { Textfit } from "react-textfit";

const SponsorBlock = ({ width, height, src }) => {
  // /treffers-sponsoren/buffetsponsor/Eikholt Kwekerijen.txt
  return (
    <div
      className="rounded-lg flex items-center justify-center"
      style={{ width, height }}
    >
      {src?.includes(":txt:") ? (
        <Textfit
          mode="multi"
          className="font-bold text-center flex items-center justify-center text-black w-4/5 h-4/5"
        >
          {src.split(":txt:")[1]}
        </Textfit>
      ) : (
        <img src={src} className="w-4/5 h-4/5 object-contain" alt="sponsor" />
      )}
    </div>
  );
};

export default SponsorBlock;
