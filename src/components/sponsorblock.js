/**
 * @file sponsorblock.js
 * @description A generic building block for displaying a single sponsor's logo or text.
 */

import React from "react";
import "tailwindcss/tailwind.css"; // make sure to import tailwind css
import { Textfit } from "react-textfit";

/**
 * SponsorBlock component.
 * Renders either an image or auto-scaled text for a sponsor inside a fixed-size container.
 *
 * @param {Object} props - The component props.
 * @param {string|number} props.width - The CSS width of the block.
 * @param {string|number} props.height - The CSS height of the block.
 * @param {string} props.src - The source URL for the image or the `:txt:` encoded string for text.
 * @returns {JSX.Element} The rendered sponsor block.
 */
const SponsorBlock = ({ width, height, src }) => {
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
