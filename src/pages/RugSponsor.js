import React from "react";
import { useEffect, useState } from "react";
import OneBlock from "../components/OneBlock";

const RugSponsor = ({ sources, index = 0 }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_rugsponsor.jpg)`,
    backgroundSize: "cover",
    height: "100vh",
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/rugsponsor/`;
    if (!sources || !sources.rugsponsor) return;
    const sourcesURLs = sources.rugsponsor.map((source) => {
      return baseURL + source.url;
    });

    setSourcesURLs(sourcesURLs);
  }, [sources]);

  return (
    <div style={divStyle}>
      <OneBlock source={sourcesURLs[index] || sourcesURLs[0]} />
    </div>
  );
};

export default RugSponsor;
