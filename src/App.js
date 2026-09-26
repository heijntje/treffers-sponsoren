/**
 * @file App.js
 * @description Main application component for the Treffers Sponsoren app.
 * It handles the routing logic based on URL parameters, switching between
 * a specific widget view or the main rotating digital signage view.
 */

import React, { useMemo, useState, useEffect } from "react";
import "./App.css";
import SponsorScreenRotator from "./SponsorScreenRotator";
import SpecialSponsorScreenRotator from "./SpecialSponsorScreenRotator";
import SponsorCategoryWidget from "./components/SponsorCategoryWidget";

/**
 * App component.
 * Parses URL search parameters to determine if a specific category widget should be shown,
 * otherwise renders the main screen rotator for the digital signage.
 *
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const category = searchParams.get("category") || searchParams.get("widget");
  const specialParam = searchParams.get("special") === "true";
  const hideHeader = searchParams.get("hideHeader") === "true";
  const theme = searchParams.get("theme") || "white";

  const [isSpecialTime, setIsSpecialTime] = useState(false);

  const checkSpecialTime = () => {
    const now = new Date();
    const amsterdamTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Amsterdam",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    
    // Some implementations use ":" as separator, others might not, but split/parseInt usually handles it.
    // Better to use formatToParts to be perfectly safe.
    const parts = amsterdamTime.formatToParts(now);
    let hour = 0;
    let minute = 0;
    for (const part of parts) {
      if (part.type === "hour") hour = parseInt(part.value, 10);
      if (part.type === "minute") minute = parseInt(part.value, 10);
    }
    
    // Check if time is between 16:30 and 17:30
    if (hour === 16 && minute >= 30) return true;
    if (hour === 17 && minute < 30) return true;
    return false;
  };

  useEffect(() => {
    setIsSpecialTime(checkSpecialTime());

    const interval = setInterval(() => {
      setIsSpecialTime(checkSpecialTime());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  if (category) {
    return (
      <div className="App-widget font-sans">
        <SponsorCategoryWidget
          categoryParam={category}
          hideHeader={hideHeader}
          theme={theme}
        />
      </div>
    );
  }

  const divStyle = {
    backgroundImage: `url(./treffers-sponsoren/background.jpg)`,
    backgroundSize: "cover",
    height: "100vh",
  };

  const showSpecial = specialParam || isSpecialTime;

  return (
    <div className="App" style={divStyle}>
      {showSpecial ? <SpecialSponsorScreenRotator /> : <SponsorScreenRotator />}
    </div>
  );
}

export default App;

