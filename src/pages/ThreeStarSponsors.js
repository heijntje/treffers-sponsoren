/**
 * @file ThreeStarSponsors.js
 * @description Page component for displaying 4 random 3-star sponsors.
 */

import React from "react";
import { useState, useEffect } from "react";
import FourBlocks from "../components/FourBlocks";

/**
 * ThreeStarSponsors component.
 * Selects 4 random 3-star sponsors and displays them using the FourBlocks layout.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.updateSourceCounts - Callback to track displayed sponsors.
 * @param {Object} props.sources - Global sources object containing threestars data.
 * @returns {JSX.Element} The rendered 3-star sponsors page.
 */
const ThreeStarSponsors = ({ updateSourceCounts, sources }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/3-STERREN.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/threestars/`;
    if (!sources) return;
    const sourcesURLs = sources.threestars.map((source) => {
      return baseURL + source.url;
    });

    setSourcesURLs(sourcesURLs);
  }, [sources]);

  const [randomizedSources, setRandomizedSources] = useState([]);

  useEffect(() => {
    const pickFourRandomSources = (sources) => {
      let shuffled = [...sources].sort(() => 0.5 - Math.random());
      let picked = shuffled.slice(0, 4);

      // Update the source counts
      updateSourceCounts("threestars", picked);

      return picked;
    };

    setRandomizedSources(pickFourRandomSources(sourcesURLs));
  }, [sourcesURLs]);

  return (
    <div style={divStyle}>
      <FourBlocks sources={randomizedSources} />
    </div>
  );
};

export default ThreeStarSponsors;
