import React from "react";
import { useEffect, useState } from "react";
import OneBlock from "../components/OneBlock";

const BalSponsor = ({ sources }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_balsponsor.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/balsponsor/`;
    if (!sources) return;
    const sourcesURLs = sources.balsponsor.map((source) => {
      return baseURL + source.url;
    });
    console.log(sourcesURLs);
    setSourcesURLs(sourcesURLs);
  }, [sources]);

  return (
    <div style={divStyle}>
      <OneBlock source={sourcesURLs[0]} />
    </div>
  );
};

export default BalSponsor;
