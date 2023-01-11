import React, { useState, useEffect } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import spdBus from "./bus2.png";
import defBus from "./bus1.png";

var check;
var check1;

const Frontpage = () => {
  const [speed, setSpeed] = useState("");
  const [route, setRoute] = useState("");
  const [Routedata, setRouteData] = useState([]);
  const [Speeddata, setSpeedData] = useState([]);

  const searchRoute = async () => {
    const res = await axios.get(
      `http://localhost:4000/vehicles/sendoneveh/${route}`
    );

    setRouteData(res.data);
    check = 1;
    check1 = 0;
  };

  const searchSpeed = async () => {
    const res1 = await axios.get(
      `http://localhost:4000/vehicles/sendonevehspd/${speed}`
    );

    setRouteData(res1.data);
    check1 = 1;
    check = 0;
  };

  return (
    <div>
      <div>
        <h1>Bus Tracker Application</h1>
      </div>
      <div>
        <h2>Map</h2>
        <MapContainer
          center={[37.0902, -95.7129]}
          zoom={4}
          style={{ height: "500px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {check === 1 &&
            Routedata.map((item, index) => (
              <Marker
                icon={L.icon({
                  iconSize: [65, 65],
                  iconUrl: defBus,
                })}
                position={[item.lat, item.lon]}
              >
                <Popup>
                  {item.vid} : {item.speed} MPH {<br></br>}
                  {item.tmstmp}
                </Popup>
              </Marker>
            ))}

          {check1 === 1 &&
            Routedata.map((item, index) => (
              <Marker
                icon={L.icon({
                  iconSize: [65, 65],
                  iconUrl: spdBus,
                })}
                position={[item.lat, item.lon]}
              >
                <Popup>
                  {item.vid} : {item.speed} MPH {<br></br>}
                  {item.tmstmp}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
      <div>
        {Routedata.length > 0 && check === 1 && (
          <p>Buses: {Routedata.length}</p>
        )}

        {Routedata.length > 0 && check1 === 1 && (
          <p>Buses: {Routedata.length}</p>
        )}
      </div>
      <div>
        <h2>Search and Report</h2>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <form>
            <input
              placeholder="Route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
            />
            <input
              placeholder="Speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
            />
          </form>
          <button onClick={searchRoute}>Start</button>
          <button>Stop</button>
          <button onClick={searchSpeed}>Report</button>
        </div>
      </div>
      <div>
        <h2>Data</h2>

        <table border="1px" style={{ border: "2px solid red" }}>
          <tr>
            <th>Bus</th>
            <th>Route:{route}</th>
            <th>Latitude</th>
            <th>Longtitude</th>
            <th>Speed</th>
            <th>Distance</th>
          </tr>
          {Routedata.map((item) => (
            <tr>
              <td>{item.vid}</td>
              <td>{item.des}</td>
              <td>{item.lat}</td>
              <td>{item.lon}</td>
              <td>{item.speed}</td>
              <td>{item.pdist}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Frontpage;
