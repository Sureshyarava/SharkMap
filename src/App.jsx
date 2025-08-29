import GoogleMapComponent from './Components/GoogleMapComponent.jsx';
import OpenFreeMapComponent from './Components/OpenFreeMapComponent.jsx';
import OpenStreetMapComponent from "./Components/OpenStreetMapComponent.jsx";
import MapTilerComponent from "./Components/MaptilerComponent.jsx";

const App = () => {
  return (
    <>
    <GoogleMapComponent />
    <br>
    </br>
    <div style={{ height: '500px', width: '300px' }}>
      <OpenFreeMapComponent />
    </div>
<br>
    </br>
    <div style={{ height: '500px', width: '300px' }}>
      <OpenStreetMapComponent />
    </div>
<br>
    </br>
    <div style={{ height: '500px', width: '300px' }}>
      <MapTilerComponent />
    </div>

    </>
  );
};

export default App;