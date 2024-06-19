import React from "react";
import { useState, useEffect } from "react";
import FourBlocks from "../components/FourBlocks";
import sources from "../sources.json";

const FourStarSponsors = ({ updateSourceCounts }) => {
  const divStyle = {
    backgroundImage: `url(/4-STERREN.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };

  const baseURL = "/fourstars/";

  const sourcesURLs = sources.fourstars.map((source) => {
    return baseURL + source.url;
  });

  const [randomizedSources, setRandomizedSources] = useState([]);

  useEffect(() => {
    const pickFourRandomSources = (sources) => {
      let shuffled = [...sources].sort(() => 0.5 - Math.random());
      let picked = shuffled.slice(0, 4);

      // Update the source counts
      updateSourceCounts("fourstars", picked);

      return picked;
    };

    setRandomizedSources(pickFourRandomSources(sourcesURLs));
  }, []);

  return (
    <div style={divStyle}>
      <FourBlocks sources={randomizedSources} />
    </div>
  );
};

export default FourStarSponsors;
