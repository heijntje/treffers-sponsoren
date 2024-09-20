import React, { useState, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./SponsorScreenRotator.css"; // Import the CSS file

import FiveStarSponsors from "./pages/FiveStarSponsors";
import FourStarSponsors from "./pages/FourStarSponsors";
import ThreeStarSponsors from "./pages/ThreeStarSponsors";
import HoofdSponsor from "./pages/HoofdSponsor";
import PupilvdWeek from "./pages/PupilvdWeek";
import WedstrijdSponsor from "./pages/WedstrijdSponsor";
import BalSponsor from "./pages/BalSponsor";
import BuffetSponsor from "./pages/BuffetSponsor";
import Advertisement from "./pages/Advertisement";
import OverigeSponsors from "./pages/OverigeSponsors";

const SponsorScreenRotator = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [sourceCounts, setSourceCounts] = useState({
    fivestars: {},
    fourstars: {},
    threestars: {},
    advertisements: {},
    overige: {},
  });

  const [sources, setSources] = useState(null);

  useEffect(() => {
    console.log("trying to fetch sources.json");
    fetch(process.env.PUBLIC_URL + "/sources.json")
      .then((response) => response.json())
      .then((data) => setSources(data));
  }, []);

  // a handle function to update the sourceCounts, this function will be passed to the child components
  const updateSourceCounts = (sourceType, sources) => {
    setSourceCounts((prevSourceCounts) => {
      const newSourceCounts = { ...prevSourceCounts };

      sources.forEach((sourceIndex) => {
        newSourceCounts[sourceType][sourceIndex] =
          newSourceCounts[sourceType][sourceIndex] + 1 || 1;
      });

      console.log(newSourceCounts);
      return newSourceCounts;
    });
  };

  const sponsors = [
    <FiveStarSponsors
      key={0}
      sources={sources}
      updateSourceCounts={updateSourceCounts}
    />,
    <FourStarSponsors
      key={1}
      sources={sources}
      updateSourceCounts={updateSourceCounts}
    />,
    <ThreeStarSponsors
      key={2}
      sources={sources}
      updateSourceCounts={updateSourceCounts}
    />,
    <HoofdSponsor key={3} />,
    // <PupilvdWeek key={4} />,
    <WedstrijdSponsor key={5} sources={sources} />,
    <BalSponsor key={6} sources={sources} />,
    <BuffetSponsor key={7} sources={sources} />,
    <Advertisement
      key={8}
      sources={sources}
      updateSourceCounts={updateSourceCounts}
    />,
    <OverigeSponsors
      key={9}
      sources={sources}
      updateSourceCounts={updateSourceCounts}
    />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prevScreen) => (prevScreen + 1) % sponsors.length);
    }, 10000);

    return () => clearInterval(interval); // This is important to clear the interval when the component unmounts
  }, [sponsors.length]);

  return (
    <>
      {sources === null || sources === undefined ? <div>Loading...</div> : null}
      <SwitchTransition>
        <CSSTransition key={currentScreen} timeout={1000} classNames="fade">
          <div>{sponsors[currentScreen]}</div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default SponsorScreenRotator;
