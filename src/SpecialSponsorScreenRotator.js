import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./SponsorScreenRotator.css";

import HoofdSponsor from "./pages/HoofdSponsor";
import BroekSponsor from "./pages/BroekSponsor";
import DugoutSponsor from "./pages/DugoutSponsor";
import MediaPartner from "./pages/MediaPartner";
import RugSponsor from "./pages/RugSponsor";
import NieuweBcLeden from "./pages/NieuweBcLeden";

const SpecialSponsorScreenRotator = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [sourceCounts, setSourceCounts] = useState({
    nieuwe_bc_leden: {},
  });

  const [sources, setSources] = useState(null);

  useEffect(() => {
    console.log("trying to fetch sources.json for special rotator");
    fetch(process.env.PUBLIC_URL + "/sources.json?v=" + Date.now(), {
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((data) => setSources(data));
  }, []);

  const updateSourceCounts = useCallback((sourceType, sources) => {
    setSourceCounts((prevSourceCounts) => {
      const newSourceCounts = { ...prevSourceCounts };
      if (!newSourceCounts[sourceType]) {
        newSourceCounts[sourceType] = {};
      }

      sources.forEach((sourceIndex) => {
        newSourceCounts[sourceType][sourceIndex] =
          newSourceCounts[sourceType][sourceIndex] + 1 || 1;
      });

      console.log(newSourceCounts);
      return newSourceCounts;
    });
  }, []);

  const sponsors = useMemo(() => {
    const screens = [
      <HoofdSponsor key="hoofdsponsor" />,
    ];

    if (sources && sources.rugsponsor && sources.rugsponsor.length > 0) {
      sources.rugsponsor.forEach((_, index) => {
        screens.push(
          <RugSponsor key={`rugsponsor-${index}`} sources={sources} index={index} />
        );
      });
    } else {
      screens.push(<RugSponsor key="rugsponsor" sources={sources} index={0} />);
    }

    screens.push(
      <BroekSponsor key="broeksponsor" sources={sources} />,
      <DugoutSponsor key="dugoutsponsor" sources={sources} />,
      <MediaPartner key="mediapartner" sources={sources} />
    );

    if (sources && sources.nieuwe_bc_leden && sources.nieuwe_bc_leden.length > 0) {
      const numPages = Math.ceil(sources.nieuwe_bc_leden.length / 8);
      for (let i = 0; i < numPages; i++) {
        screens.push(
          <NieuweBcLeden
            key={`nieuwebcleden-${i}`}
            sources={sources}
            updateSourceCounts={updateSourceCounts}
            page={i}
          />
        );
      }
    } else {
      screens.push(
        <NieuweBcLeden
          key="nieuwebcleden"
          sources={sources}
          updateSourceCounts={updateSourceCounts}
          page={0}
        />
      );
    }

    return screens;
  }, [sources, updateSourceCounts]);

  useEffect(() => {
    setCurrentScreen((prevScreen) => {
      if (prevScreen >= sponsors.length) {
        return 0;
      }
      return prevScreen;
    });

    const duration = 10000; // 10 seconds per screen

    const timer = setTimeout(() => {
      setCurrentScreen((prevScreen) => (prevScreen + 1) % sponsors.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentScreen, sponsors]);

  const handleScreenClick = (e) => {
    const clickX = e.clientX;
    const halfWidth = window.innerWidth / 2;
    if (clickX < halfWidth) {
      setCurrentScreen(
        (prevScreen) => (prevScreen - 1 + sponsors.length) % sponsors.length,
      );
    } else {
      setCurrentScreen((prevScreen) => (prevScreen + 1) % sponsors.length);
    }
  };

  return (
    <div onClick={handleScreenClick}>
      {sources === null || sources === undefined ? <div>Loading...</div> : null}
      <SwitchTransition>
        <CSSTransition key={currentScreen} timeout={1000} classNames="fade">
          <div>{sponsors[currentScreen]}</div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default SpecialSponsorScreenRotator;
