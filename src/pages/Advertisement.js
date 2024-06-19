import React from "react";
import { useState, useEffect } from "react";
import sources from "../sources.json";

const Advertisement = ({ updateSourceCounts }) => {
  const divStyle = {
    backgroundImage: `url(/background.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
    width: "100vw",
  };

  const baseURL = "/advertisements/";

  const sourcesURLs = sources.advertisements.map((source) => {
    return baseURL + source.url;
  });

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
  }, []);

  return (
    <div style={divStyle}>
      {randomizedSource.includes("mp4") ? (
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
