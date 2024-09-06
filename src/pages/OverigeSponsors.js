import React from "react";
import { useState, useEffect } from "react";
import EightBlocks from "../components/EightBlocks";

const OverigeSponsors = ({ updateSourceCounts, sources }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_bc.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/overige/`;
    if (!sources) return;
    const sourcesURLs = sources.overige.map((source) => {
      return baseURL + source.url;
    });

    setSourcesURLs(sourcesURLs);
  }, [sources]);

  const [randomizedSources, setRandomizedSources] = useState([]);

  useEffect(() => {
    const pickEightandomSources = (sources) => {
      let shuffled = [...sources].sort(() => 0.5 - Math.random());
      let picked = shuffled.slice(0, 8);

      // Update the source counts
      updateSourceCounts("overige", picked);
      return picked;
    };

    setRandomizedSources(pickEightandomSources(sourcesURLs));
  }, [sourcesURLs]);

  return (
    <div style={divStyle}>
      <EightBlocks sources={randomizedSources} />
    </div>
  );
};

export default OverigeSponsors;
