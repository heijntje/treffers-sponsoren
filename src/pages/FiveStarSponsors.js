import React from "react";
import { useState, useEffect } from "react";
import TwoBlocks from "../components/TwoBlocks";

const FiveStarSponsors = ({ updateSourceCounts, sources }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/5-STERREN.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/fivestars/`;
    if (!sources) return;
    const sourcesURLs = sources.fivestars.map((source) => {
      return baseURL + source.url;
    });

    setSourcesURLs(sourcesURLs);
  }, [sources]);

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
  }, [sourcesURLs]);

  return (
    <div style={divStyle}>
      <TwoBlocks sources={randomizedSources} />
    </div>
  );
};

export default FiveStarSponsors;
