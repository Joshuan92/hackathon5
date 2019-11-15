import React, { useEffect, useState } from "react";
import Flight from "./Flight.jsx";
import Droplist from "./Droplist.jsx";
import { Nav, Spinner, Button } from "reactstrap";
import { airportTo, airportFrom } from "./Airports.js";
import DirectFlightsCheckbox from './DirectFlightsCheckbox.jsx'



const App = () => {
  const [flightData, setFlightData] = useState([]);
  const [flyTo, setFlyTo] = useState();
  const [flyFrom, setFlyFrom] = useState();
  const [searchDirect, setSearchDirect] = useState(false);

  let URL =
  `https://api.skypicker.com/flights?flyFrom=${airportFrom[flyFrom]}&to=${airportTo[flyTo]}&dateFrom=18/11/2019&dateTo=12/12/2019&partner=picky&limit=10&direct_flights=${+searchDirect}`;

  // useEffect(() => {
  //   fetch(URL)
  //     .then(resp => resp.json())
  //     .then(resp => setFlightData(resp));
  // }, []);

  useEffect(() => {
    console.log(URL);
  });

  const handleSearch = () => {
    fetch(URL)
      .then(resp => resp.json())
      .then(resp => setFlightData(resp));
  }

  const toggleIsDirect = () => { //communication with LogoutPopup component
    setSearchDirect(prev => !prev)
    
  }

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
        <DirectFlightsCheckbox
        isDirect={searchDirect}
        toggleIsDirect={toggleIsDirect}
        />
      </Nav>
      <Button color="primary" onClick={handleSearch}>Search</Button>
      <div className='container'>
        <div>{flights}</div>
      </div>
    </>
  );
};

export default App;
