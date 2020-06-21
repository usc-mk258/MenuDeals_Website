import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/index.min.css";

export const Map = (props) => {
  const { currentLocation, setLatLng } = props;
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [markerLocation, setMarkerLocation] = useState({
    lat: 0,
    lng: 0,
  });
  useEffect(() => {
    setLocation({
      lat: currentLocation.center.centerlat,
      lng: currentLocation.center.centerlng,
    });
    setMarkerLocation({
      lat: currentLocation.center.centerlat,
      lng: currentLocation.center.centerlng,
    });
  }, [currentLocation]);

  const [drag, setDrag] = useState(true);
  const selectedPlace = async (address) => {
    const place = await geocodeByPlaceId(address.place_id);
    console.log(place[0].geometry.location.lat());
    console.log(place[0].geometry.location.lng());
    setLocation({
      lat: place[0].geometry.location.lat(),
      lng: place[0].geometry.location.lng(),
    });
    setMarkerLocation({
      lat: place[0].geometry.location.lat(),
      lng: place[0].geometry.location.lng(),
    });
    setLatLng(
      place[0].geometry.location.lat(),
      place[0].geometry.location.lng()
    );
  };

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        defaultZoom={15}
        draggable={drag}
        center={{
          lat: location.lat,
          lng: location.lng,
        }}
        onChildMouseDown={() => setDrag(false)}
        onChildMouseUp={() => {
          console.log("setting2::, ", markerLocation);
          setDrag(true);
          setLatLng(markerLocation.lat, markerLocation.lng);
        }}
        onChildMouseMove={(key, marker, newCoords) => {
          console.log("setting::, ", newCoords);
          setMarkerLocation({
            lat: newCoords.lat,
            lng: newCoords.lng,
          });
        }}
      >
        <Marker lat={markerLocation.lat} lng={markerLocation.lng} />
      </GoogleMapReact>
      <h4 style={{ fontWeight: "bold" }}>OR Search Address</h4>
      <GooglePlacesAutocomplete onSelect={selectedPlace} />
    </div>
  );
};
