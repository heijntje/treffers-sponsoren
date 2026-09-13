/**
 * @file BuffetSponsor.js
 * @description Page component for displaying the "buffetsponsor".
 */

import React from "react";
import { useEffect, useState } from "react";
import OneBlock from "../components/OneBlock";

/**
 * BuffetSponsor component.
 * Displays the specific buffetsponsor logo on top of a custom background.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.sources - Global sources object containing buffetsponsor data.
 * @returns {JSX.Element} The rendered buffetsponsor page.
 */
const BuffetSponsor = ({ sources }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_buffetsponsor.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/buffetsponsor/`;
    if (!sources) return;
    const sourcesURLs = sources.buffetsponsor.map((source) => {
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

export default BuffetSponsor;
