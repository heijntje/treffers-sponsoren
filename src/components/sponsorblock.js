import React from "react";
import "tailwindcss/tailwind.css"; // make sure to import tailwind css

const SponsorBlock = ({ width, height, src }) => {
  return (
    <div
      className="rounded-lg flex items-center justify-center"
      style={{ width, height }}
    >
      <img src={src} className="w-4/5 h-4/5 object-contain" alt="sponsor" />
    </div>
  );
};

export default SponsorBlock;
