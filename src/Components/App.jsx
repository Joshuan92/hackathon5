import React, { useEffect, useState } from "react";
import Flight from './Flight.jsx'
<<<<<<< Updated upstream
=======
import Droplist from './Droplist.jsx'
import DirectFlightsCheckbox from './DirectFlightsCheckbox.jsx'
>>>>>>> Stashed changes


const App = () => {
  const [flightData, setFlightData] = useState([]);
  const [searchDirect, setSearchDirect] = useState(false);

  let URL =
  `https://api.skypicker.com/flights?flyFrom=PRG&to=LGW&dateFrom=18/11/2019&dateTo=12/12/2019&partner=picky&limit=10&direct_flights=${+searchDirect}`;

  // useEffect(() => {
  //   fetch(URL)
  //     .then(resp => resp.json())
  //     .then(resp => setFlightData(resp));
  // }, []);

  useEffect(() => {
    console.log(URL);
  });

  const toggleIsDirect = () => { //communication with LogoutPopup component
    setSearchDirect(prev => !prev)
    
  }

const flights = flightData.length !== 0? flightData.data.map((flight, index) =>(
    <Flight flightData={flight} key={index}/>
 )) : 'loading';

  return (
<<<<<<< Updated upstream
    <div className="container">
      <div>{flights}</div>
    </div>
=======
<>
        <Droplist
        title={'Fly from'}
        />
        <Droplist
        title={'Fly to'}
        />
        <DirectFlightsCheckbox
        isDirect={searchDirect}
        toggleIsDirect={toggleIsDirect}
        />
        <div className="container">
          <div>{flights}</div>
        </div>
</>
>>>>>>> Stashed changes
  );
};

export default App;
