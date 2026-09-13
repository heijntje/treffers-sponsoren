/**
 * @file Announcements.js
 * @description Page component for displaying randomized club announcements.
 * Supports both image and video formats.
 */

import React from "react";
import { useState, useEffect } from "react";

/**
 * Announcements component.
 * Randomly picks an announcement source and displays it full screen.
 * Tracks display counts via `updateSourceCounts`.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.updateSourceCounts - Callback to track displayed announcements.
 * @param {Object} props.sources - Global data sources object containing announcements.
 * @returns {JSX.Element} The rendered announcements page.
 */
const Announcements = ({ updateSourceCounts, sources }) => {
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
    const baseURL = `${process.env.PUBLIC_URL}/announcements/`;
    if (!sources || !sources.announcements) return;
    const sourcesURLs = sources.announcements.map((source) => {
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
      updateSourceCounts("announcements", [picked]);

      return picked;
    };

    setRandomizedSource(pickRandomSource(sourcesURLs));
  }, [sourcesURLs]);

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
        <img src={randomizedSource} alt="announcement" style={mediaStyle} />
      ) : null}
    </div>
  );
};

export default Announcements;
