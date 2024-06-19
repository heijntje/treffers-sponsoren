import React from "react";
import { useState, useEffect } from "react";
import TwoBlocks from "../components/TwoBlocks";
import sources from "../sources.json";

const FiveStarSponsors = ({ updateSourceCounts }) => {
  const divStyle = {
    backgroundImage: `url(/5-STERREN.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };

  const baseURL = "/fivestars/";

  const sourcesURLs = sources.fivestars.map((source) => {
    return baseURL + source.url;
  });

  const [randomizedSources, setRandomizedSources] = useState([]);

  useEffect(() => {
    const pickTwoRandomSources = (sources) => {
      let shuffled = [...sources].sort(() => 0.5 - Math.random());
      let picked = shuffled.slice(0, 2);

      // Update the source counts
      updateSourceCounts("fivestars", picked);

      return picked;
    };

    setRandomizedSources(pickTwoRandomSources(sourcesURLs));
  }, []);

  return (
    <div style={divStyle}>
      <TwoBlocks sources={randomizedSources} />
    </div>
  );
};

export default FiveStarSponsors;
