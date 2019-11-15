import React, { useEffect, useState } from "react";
import Flight from "./Flight.jsx";
import Droplist from "./Droplist.jsx";
import { Nav, Spinner, Button } from "reactstrap";
import { airportTo, airportFrom } from "./Airports.js";
import DirectFlightsCheckbox from "./DirectFlightsCheckbox.jsx";
import Pagination from "./Pagination.jsx";

const App = () => {
  const [flightData, setFlightData] = useState([]);
  const [flyTo, setFlyTo] = useState();
  const [flyFrom, setFlyFrom] = useState();
  const [searchDirect, setSearchDirect] = useState(false);
  const [searchStatus, setSearchStatus] = useState("initial")

  let URL = `https://api.skypicker.com/flights?flyFrom=${
    airportFrom[flyFrom]
  }&to=${
    airportTo[flyTo]
  }&dateFrom=18/11/2019&dateTo=12/12/2019&partner=picky&limit=10&direct_flights=${+searchDirect}`;

  useEffect(() => {
   console.log("pes");
  });

  async function handleSearch() {
    setSearchStatus("searching")
    await fetch(URL)
      .then(resp => resp.json())
<<<<<<< HEAD
      .then(resp => setFlightData(resp))

      setSearchStatus("done");
  }

  const toggleIsDirect = () => {
    setSearchDirect(prev => !prev)
    
  }
=======
      .then(resp => setFlightData(resp));
  };

  const toggleIsDirect = () => {
    //communication with LogoutPopup component
    setSearchDirect(prev => !prev);
  };
>>>>>>> bitchbranch

  const checkSearch = () => {
    if (searchStatus === "initial") {
      return "Choose a flight"
    } else if (searchStatus === "searching") {
      return <Spinner color='dark' />
    } else if (flightData.data.length !== 0) {
      return flightData.data.map((flight, index) => (
        <Flight flightData={flight} key={index} />
      ))
    } else if (flightData.data.length === 0) {
      return "no flights found"
    } else {
      return "error"
    }
  }

  let flights = checkSearch();

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
      <Button color='primary' onClick={handleSearch}>
        Search
      </Button>
      <Pagination data={flightData}>
        <div className='container'>
          <div>{flights}</div>
        </div>
      </Pagination>
    </>
  );
};

export default App;
