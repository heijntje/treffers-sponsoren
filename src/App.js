import "./App.css";
import SponsorScreenRotator from "./SponsorScreenRotator";

function App() {
  const divStyle = {
    backgroundImage: `url(./treffers-sponsoren/background.jpg)`,
    backgroundSize: "cover", // this will ensure the image covers the whole div
    height: "100vh", // this will make the div take the full height of the viewport
  };

  return (
    <div className="App" style={divStyle}>
      <SponsorScreenRotator />
    </div>
  );
}

export default App;
