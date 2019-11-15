import React, { useEffect, useState } from "react";
import Flight from "./Flight.jsx";
import Droplist from "./Droplist.jsx";
import { Nav, Spinner, Button, Table } from "reactstrap";
import { airportTo, airportFrom } from "./Airports.js";
import DirectFlightsCheckbox from "./DirectFlightsCheckbox.jsx";

const App = () => {
  const [flightData, setFlightData] = useState([]);
  const [flyTo, setFlyTo] = useState();
  const [flyFrom, setFlyFrom] = useState();
  const [searchDirect, setSearchDirect] = useState(false);
  const [searchStatus, setSearchStatus] = useState("initial");
  const [limit, setLimit] = useState(5);

  let URL = `https://api.skypicker.com/flights?flyFrom=${
    airportFrom[flyFrom]
  }&to=${
    airportTo[flyTo]
  }&dateFrom=18/11/2019&dateTo=12/12/2019&partner=picky&direct_flights=${+searchDirect}`;

  // useEffect(() => {
  //  flightData.length !== 0 ? console.log(flightData.data.length) : null;
  // });

  async function handleSearch() {
    setSearchStatus("searching");
    await fetch(URL)
      .then(resp => resp.json())
      .then(resp => setFlightData(resp));

    setSearchStatus("done");
  }

  const handleNext = () => {
    if (flightData.data.length >= limit) {
      setLimit(limit + 5);
    }
  };

  const handlePrev = () => {
    if (limit - 5 >= 5) {
      setLimit(limit - 5);
    }
  };

  const toggleIsDirect = () => {
    setSearchDirect(prev => !prev);
  };

  const checkSearch = () => {
    if (searchStatus === "initial") {
      return "Choose a flight";
    } else if (searchStatus === "searching") {
      return <Spinner color='dark' />;
    } else if (flightData.data.length !== 0) {
      return (
        <>
          <p>Found {flightData.data.length} flights</p>
          <div className='container'>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Flight from</th>
                  <th>Layovers</th>
                  <th>Flight to</th>
                  <th>Departure time</th>
                  <th>Arrival time</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {flightData.data
                  .slice(limit - 5, limit)
                  .map((flight, index) => (
                    <Flight
                      flightData={flight}
                      key={index}
                      index={index + limit - 5}
                    />
                  ))}
              </tbody>
            </Table>
          </div>
        </>
      );
    } else if (flightData.data.length === 0) {
      return "no flights found";
    } else {
      return "error";
    }
  };

  let flights = checkSearch();

  let pagination =
    searchStatus === "done" ? (
      <>
        <Button color='danger' onClick={handlePrev}>
          Previous
        </Button>
        <Button color='danger' onClick={handleNext}>
          Next
        </Button>
      </>
    ) : (
      ""
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
      <Button color='primary' onClick={handleSearch}>
        Search
      </Button>
      <div className='container'>
        <div>{flights}</div>
      </div>
      {pagination}
    </>
  );
};

export default App;
