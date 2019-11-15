import React, { useEffect, useState } from "react";
import Flight from './Flight.jsx'

const URL =
  "https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2019&dateTo=12/12/2019&partner=picky&limit=10";

const App = () => {
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then(resp => resp.json())
    //   .then(resp => console.log(resp.data));
      .then(resp => setFlightData(resp));
  }, []);

const flights = flightData.length !== 0? flightData.data.map((flight, index) =>(
    <Flight flightData={flight} key={index}/>
 )) : 'loading';

  return (
    <div>{flights}</div>

  );
};

export default App;
