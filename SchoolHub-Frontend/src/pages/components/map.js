import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import { FaChevronUp } from "react-icons/fa6";

const Map = () => {
  const center = { lat: 9.9221918633909, lng: 78.14943222506953 };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAzhUxevvN0IXmaL0gVTLZXN8po6TdiOzc",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const [showDirection, setShowDirection] = useState(false);

  const originRef = useRef();
  const destiantionRef = useRef();

  const handleShowDirection = () => {
    setShowDirection((prev) => !prev);
  };

  if (!isLoaded) {
    return <div>Loading!!!!!!!</div>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <>
      {/* <div className="route-tracking-form">
        <div>
        <input
          type="text"
          placeholder="origin"
          className="text-field form-control"
          ref={originRef}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={calculateRoute}
        >
          Go
        </button>
        </div>
        <div>
        <input
          type="text"
          placeholder="destination"
          className="text-field form-control"
          ref={destiantionRef}
        />
        <button type="button" className="btn btn-warning" onClick={clearRoute}>
          Clear
        </button>
        </div>
        <p>{`Distance - ${distance}`}</p>
        <p>{`Duration - ${duration}`}</p>
      </div> */}
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} icon={"images/bus-marker.png"} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </>
  );
};

export default Map;
