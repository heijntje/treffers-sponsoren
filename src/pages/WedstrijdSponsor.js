/**
 * @file WedstrijdSponsor.js
 * @description Page component for displaying the match sponsor (wedstrijdsponsor).
 */

import React from "react";
import { useEffect, useState } from "react";
import OneBlock from "../components/OneBlock";

/**
 * WedstrijdSponsor component.
 * Displays the specific wedstrijdsponsor logo on top of a custom background.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.sources - Global sources object containing wedstrijdsponsor data.
 * @returns {JSX.Element} The rendered match sponsor page.
 */
const WedstrijdSponsor = ({ sources }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_wedstrijdsponsor.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/wedstrijdsponsor/`;
    if (!sources) return;
    const sourcesURLs = sources.wedstrijdsponsor.map((source) => {
      return baseURL + source.url;
    });

    setSourcesURLs(sourcesURLs);
  }, [sources]);

  return (
    <div style={divStyle}>
      <OneBlock source={sourcesURLs[0]} />
    </div>
  );
};

export default WedstrijdSponsor;
