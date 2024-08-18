import React from "react";
import { useState, useEffect } from "react";

const Advertisement = ({ updateSourceCounts, sources }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
    width: "100vw",
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/advertisements/`;
    if (!sources) return;
    const sourcesURLs = sources.advertisements.map((source) => {
      return baseURL + source.url;
    });

    setSourcesURLs(sourcesURLs);
  }, [sources]);

  const [randomizedSource, setRandomizedSource] = useState("");

  useEffect(() => {
    const pickRandomSource = (sources) => {
      let shuffled = [...sources].sort(() => 0.5 - Math.random());
      let picked = shuffled[0];

      // Update the source counts
      updateSourceCounts("advertisements", [picked]);

      return picked;
    };

    setRandomizedSource(pickRandomSource(sourcesURLs));
  }, [sourcesURLs]);

  return (
    <div style={divStyle}>
      {randomizedSource?.includes("mp4") ? (
        <video autoPlay loop muted>
          <source src={randomizedSource} type="video/mp4" />
        </video>
      ) : (
        <img src={randomizedSource} alt="advertisement" />
      )}
    </div>
  );
};

export default Advertisement;
