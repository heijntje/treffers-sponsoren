/**
 * @file Advertisement.js
 * @description Page component for displaying a random advertisement (image or video) from the advertisements source.
 */

import React from "react";
import { useState, useEffect } from "react";

/**
 * Advertisement component.
 * Randomly picks an advertisement source (which can be mp4 video or image) and displays it.
 * Calls `updateSourceCounts` to track which advertisement was shown.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.updateSourceCounts - Callback to update the displayed count of the source.
 * @param {Object} props.sources - The global sources object containing advertisement definitions.
 * @returns {JSX.Element} The rendered advertisement page.
 */
const Advertisement = ({ updateSourceCounts, sources }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/advertisements/`;
    if (!sources || !sources.advertisements) return;
    const sourcesURLs = sources.advertisements.map((source) => {
      return baseURL + source.url;
    });

    setSourcesURLs(sourcesURLs);
  }, [sources]);

  const [randomizedSource, setRandomizedSource] = useState("");

  useEffect(() => {
    if (!sourcesURLs || sourcesURLs.length === 0) {
      setRandomizedSource("");
      return;
    }

    const pickRandomSource = (sources) => {
      let shuffled = [...sources].sort(() => 0.5 - Math.random());
      let picked = shuffled[0];

      // Update the source counts
      updateSourceCounts("advertisements", [picked]);

      return picked;
    };

    setRandomizedSource(pickRandomSource(sourcesURLs));
  }, [sourcesURLs, updateSourceCounts]);

  const isVideo =
    randomizedSource &&
    /\.(mp4|mov|webm)$/i.test(randomizedSource);

  const mediaStyle = {
    maxWidth: "100vw",
    maxHeight: "100vh",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  return (
    <div style={divStyle}>
      {isVideo ? (
        <video
          key={randomizedSource}
          src={randomizedSource}
          autoPlay
          loop
          muted
          playsInline
          style={mediaStyle}
        />
      ) : randomizedSource ? (
        <img src={randomizedSource} alt="advertisement" style={mediaStyle} />
      ) : null}
    </div>
  );
};

export default Advertisement;
