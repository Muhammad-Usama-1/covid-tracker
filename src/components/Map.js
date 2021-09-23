import React from "react";
import "./../styles/Map.css";
// import "numeral" from "numeral";
import { casesTypeColors } from "./Utils";
import numeral from "numeral";
import { Map as LeafLetMap, Circle, Popup, TileLayer } from "react-leaflet";

// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
function Map({ countries, casesType, center, zoom, mapCenter, setMapCenter }) {
  console.log(center);
  // Draw circle on the map wtih interactive tooltip
  const showDataOnMap = (data) =>
    data.map((country) => (
      <Circle
        center={[country?.countryInfo?.lat, country?.countryInfo?.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            ></div>
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
  return (
    <div className="map">
      <LeafLetMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafLetMap>
    </div>
  );
}

export default Map;
