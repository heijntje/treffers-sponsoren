import React, { useState, useEffect, useMemo, useCallback } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./SponsorScreenRotator.css"; // Import the CSS file

import FiveStarSponsors from "./pages/FiveStarSponsors";
import FourStarSponsors from "./pages/FourStarSponsors";
import ThreeStarSponsors from "./pages/ThreeStarSponsors";
import HoofdSponsor from "./pages/HoofdSponsor";
import Aankondigingen from "./pages/Aankondigingen";
import PupilvdWeek from "./pages/PupilvdWeek";
import WedstrijdSponsor from "./pages/WedstrijdSponsor";
import BalSponsor from "./pages/BalSponsor";
import BuffetSponsor from "./pages/BuffetSponsor";
import Advertisement from "./pages/Advertisement";
import Announcements from "./pages/Announcements";
import BusinessClubSponsors from "./pages/BusinessClubSponsors";

const SponsorScreenRotator = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [sourceCounts, setSourceCounts] = useState({
    fivestars: {},
    fourstars: {},
    threestars: {},
    advertisements: {},
    announcements: {},
    businessclub: {},
  });

  const [sources, setSources] = useState(null);
  const [isAnnouncementTime, setIsAnnouncementTime] = useState(false);

  useEffect(() => {
    console.log("trying to fetch sources.json");
    fetch(process.env.PUBLIC_URL + "/sources.json")
      .then((response) => response.json())
      .then((data) => setSources(data));
  }, []);

  // Check if current time is within announcement window (4 PM - 7 PM) in Amsterdam timezone
  const checkAnnouncementTime = () => {
    const now = new Date();
    // Get the hour in Amsterdam timezone using Intl API
    const amsterdamTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Amsterdam",
      hour: "numeric",
      hour12: false,
    });
    const currentHour = parseInt(amsterdamTime.format(now), 10);
    // Check if time is between 16:00 (4 PM) and 19:00 (7 PM)
    console.log("currentHour (Amsterdam)", currentHour);
    console.log("isAnnouncementTime", currentHour >= 16 && currentHour < 19);
    return currentHour >= 16 && currentHour < 19;
  };

  // Periodically check if we're in the announcement time window
  useEffect(() => {
    // Check immediately
    setIsAnnouncementTime(checkAnnouncementTime());

    // Check every minute to update when entering/leaving the time window
    const interval = setInterval(() => {
      setIsAnnouncementTime(checkAnnouncementTime());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // a handle function to update the sourceCounts, this function will be passed to the child components
  const updateSourceCounts = useCallback((sourceType, sources) => {
    setSourceCounts((prevSourceCounts) => {
      const newSourceCounts = { ...prevSourceCounts };

      sources.forEach((sourceIndex) => {
        newSourceCounts[sourceType][sourceIndex] =
          newSourceCounts[sourceType][sourceIndex] + 1 || 1;
      });

      console.log(newSourceCounts);
      return newSourceCounts;
    });
  }, []);

  // Build sponsors array conditionally based on time
  const sponsors = useMemo(
    () => [
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
      <WedstrijdSponsor key={7} sources={sources} />,
      <BalSponsor key={8} sources={sources} />,
      // <BuffetSponsor key={9} sources={sources} />,
      <Advertisement
        key={10}
        sources={sources}
        updateSourceCounts={updateSourceCounts}
      />,
      // // Only include Announcements if we're in the time window (4 PM - 7 PM)
      // ...(isAnnouncementTime
      //   ? [
      // <Announcements
      //   key={11}
      //   sources={sources}
      //   updateSourceCounts={updateSourceCounts}
      // />,
      //     ]
      //   : []),
      <BusinessClubSponsors
        key={12}
        sources={sources}
        updateSourceCounts={updateSourceCounts}
      />,
    ],
    [sources, isAnnouncementTime, updateSourceCounts],
  );

  useEffect(() => {
    // Reset currentScreen if it's out of bounds when sponsors array changes
    setCurrentScreen((prevScreen) => {
      if (prevScreen >= sponsors.length) {
        return 0;
      }
      return prevScreen;
    });

    const interval = setInterval(() => {
      setCurrentScreen((prevScreen) => (prevScreen + 1) % sponsors.length);
    }, 10000);

    return () => clearInterval(interval); // This is important to clear the interval when the component unmounts
  }, [sponsors]);

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
