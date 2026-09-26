import React from "react";
import { useState, useEffect } from "react";
import EightBlocks from "../components/EightBlocks";

const NieuweBcLeden = ({ updateSourceCounts, sources, page = 0 }) => {
  const divStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/scherm_new_bc_members.jpg)`,
    backgroundSize: "cover",
    height: "100vh",
  };

  const [sourcesURLs, setSourcesURLs] = useState([]);

  useEffect(() => {
    const baseURL = `${process.env.PUBLIC_URL}/nieuwe_bc_leden/`;
    if (!sources || !sources.nieuwe_bc_leden) return;
    const urls = sources.nieuwe_bc_leden.map((source) => {
      return baseURL + source.url;
    });

    setSourcesURLs(urls);
  }, [sources]);

  const [displayedSources, setDisplayedSources] = useState([]);

  useEffect(() => {
    if (sourcesURLs.length === 0) return;

    const start = page * 8;
    const picked = sourcesURLs.slice(start, start + 8);

    if (updateSourceCounts) {
      updateSourceCounts("nieuwe_bc_leden", picked);
    }
    
    setDisplayedSources(picked);
  }, [sourcesURLs, page, updateSourceCounts]);

  return (
    <div style={divStyle}>
      <EightBlocks sources={displayedSources} />
    </div>
  );
};

export default NieuweBcLeden;
