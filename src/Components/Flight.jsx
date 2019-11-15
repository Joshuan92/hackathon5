import React, { useEffect, useState } from "react";
import { DateTime } from 'luxon';


const Flight = (props) => {

const { flightData } = props

const departureTime = DateTime.fromMillis(flightData.dTime * 1000).toFormat('dd/LL/yyyy hh:mm')

const arrivalTime = DateTime.fromMillis(flightData.aTime * 1000).toFormat('dd/LL/yyyy hh:mm')

const transfers = flightData.route.length > 1 ? <p>Transfers: {flightData.route.slice(1).map(flight => flight.cityFrom) + ' '}</p>:null



  return (
    <div className="flightDetail">
        <p>From: {flightData.cityFrom}</p>
        {transfers}
        <p>To: {flightData.cityTo}</p>
        <p>Departure time: {departureTime} ({flightData.cityFrom} time)</p>
        <p>Arrival time: {arrivalTime} ({flightData.cityTo} time)</p>
        <p>Price: {flightData.price}€</p>
    </div>

  );
};

export default Flight;
