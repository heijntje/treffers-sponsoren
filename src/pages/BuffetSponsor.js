import React from "react";
import { useEffect, useState } from "react";
import OneBlock from "../components/OneBlock";

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
