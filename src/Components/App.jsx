import React, { useEffect, useState } from "react";
import Flight from "./Flight.jsx";
import Droplist from "./Droplist.jsx";
import { Nav, Spinner } from "reactstrap";
import { airportTo, airportFrom } from "./Airports.js";

const URL =
  "https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2019&dateTo=12/12/2019&partner=picky&limit=10&direct_flights=1";

const App = () => {
  const [flightData, setFlightData] = useState([]);
  const [flyTo, setFlyTo] = useState();
  const [flyFrom, setFlyFrom] = useState();

  useEffect(() => {
    fetch(URL)
      .then(resp => resp.json())
      .then(resp => setFlightData(resp));
  }, []);

  const flights =
    flightData.length !== 0 ? (
      flightData.data.map((flight, index) => (
        <Flight flightData={flight} key={index} />
      ))
    ) : (
      <Spinner color='dark' />
    );

  return (
    <>
      <Nav>
        <Droplist
          title={flyFrom ? `Fly from: ${flyFrom}` : "Fly from"}
          color='primary'
          options={Object.keys(airportFrom)}
          setAirport={setFlyFrom}
        />
        <Droplist
          title={flyTo ? `Fly to: ${flyTo}` : "Fly to"}
          color='primary'
          options={Object.keys(airportTo)}
          setAirport={setFlyTo}
        />
      </Nav>
      <div className='container'>
        <div>{flights}</div>
      </div>
    </>
  );
};

export default App;
