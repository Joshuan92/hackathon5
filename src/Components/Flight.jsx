// You should always display at least time of departure and arrival in local time, name of the origin and departure & price for the flight

import React, { useEffect, useState } from "react";


const Flight = (props) => {

const { flightData } = props

  return (
    <div>
        <p>{flightData.price}</p>
    </div>

  );
};

export default Flight;
