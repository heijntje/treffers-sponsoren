import React from "react";
import { useEffect, useState } from "react";
import OneBlock from "../components/OneBlock";

const DugoutSponsor = ({ sources }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_dugoutsponsor.jpg)`,
    backgroundSize: "cover",
    height: "100vh",
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/dugoutsponsor/`;
    if (!sources || !sources.dugoutsponsor) return;
    const sourcesURLs = sources.dugoutsponsor.map((source) => {
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

export default DugoutSponsor;
