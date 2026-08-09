import React, { useMemo } from "react";
import "./App.css";
import SponsorScreenRotator from "./SponsorScreenRotator";
import SponsorCategoryWidget from "./components/SponsorCategoryWidget";

function App() {
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );

  const category = searchParams.get("category") || searchParams.get("widget");
  const hideHeader = searchParams.get("hideHeader") === "true";
  const theme = searchParams.get("theme") || "white";

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

  return (
    <div className="App" style={divStyle}>
      <SponsorScreenRotator />
    </div>
  );
}

export default App;

