import OpenFreeMapComponent from './Components/OpenFreeMapComponent.jsx';
import OpenStreetMapComponent from "./Components/OpenStreetMapComponent.jsx";
import MapTilerComponent from "./Components/MaptilerComponent.jsx";

const App = () => {
  return (
    <>
    <br>
    </br>
    <div style={{ height: '80vh', width: '50vw' }}>
      <OpenFreeMapComponent />
    </div>
<br>
    </br>
    <div style={{ height: '80vh', width: '50vw' }}>
      <OpenStreetMapComponent />
    </div>
<br>
    </br>
    <div style={{ height: '80vh', width: '50vw' }}>
      <MapTilerComponent />
    </div>

    </>
  );
};

export default App;