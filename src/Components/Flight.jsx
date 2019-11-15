import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { DateTime } from 'luxon';


const Flight = (props) => {

const { flightData, key, index } = props

const departureTime = DateTime.fromMillis(flightData.dTime * 1000).toFormat('dd/LL/yyyy hh:mm')

const arrivalTime = DateTime.fromMillis(flightData.aTime * 1000).toFormat('dd/LL/yyyy hh:mm')

const transfers = flightData.route.length > 1 ? <p> {flightData.route.slice(1).map(flight => flight.cityFrom) + ' '}</p>:null


console.log(index);

  return (


<>
          <tr>
          <th scope="row">{index + 1}</th>
            <td>{flightData.cityFrom}</td>
            <td>{transfers}</td>
            <td>{flightData.cityTo}</td>
          <td>{departureTime} ({flightData.cityFrom} time)</td>
          <td>{arrivalTime} ({flightData.cityTo} time)</td>
          <td>{flightData.price}€</td>
  
          </tr>
</>



  );
};

export default Flight;

