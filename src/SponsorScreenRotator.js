import React, { useState, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./SponsorScreenRotator.css"; // Import the CSS file

import FiveStarSponsors from "./pages/FiveStarSponsors";
import FourStarSponsors from "./pages/FourStarSponsors";
import ThreeStarSponsors from "./pages/ThreeStarSponsors";
import BalSponsor from "./pages/BalSponsor";
import Advertisement from "./pages/Advertisement";

const SponsorScreenRotator = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [sourceCounts, setSourceCounts] = useState({
    fivestars: {},
    fourstars: {},
    threestars: {},
    advertisements: {},
  });

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
    <FiveStarSponsors key={0} updateSourceCounts={updateSourceCounts} />,
    <FourStarSponsors key={1} updateSourceCounts={updateSourceCounts} />,
    <ThreeStarSponsors key={2} updateSourceCounts={updateSourceCounts} />,
    // <BalSponsor key={4} />,
    <Advertisement key={5} updateSourceCounts={updateSourceCounts} />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prevScreen) => (prevScreen + 1) % sponsors.length);
    }, 10000);

    return () => clearInterval(interval); // This is important to clear the interval when the component unmounts
  }, [sponsors.length]);

  return (
    <SwitchTransition>
      <CSSTransition key={currentScreen} timeout={1000} classNames="fade">
        <div>{sponsors[currentScreen]}</div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default SponsorScreenRotator;
