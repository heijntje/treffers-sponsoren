import React from "react";
import { useEffect, useState } from "react";
import OneBlock from "../components/OneBlock";

const BroekSponsor = ({ sources }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_broeksponsor.jpg)`,
    backgroundSize: "cover",
    height: "100vh",
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/broeksponsor/`;
    if (!sources || !sources.broeksponsor) return;
    const sourcesURLs = sources.broeksponsor.map((source) => {
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

export default BroekSponsor;
