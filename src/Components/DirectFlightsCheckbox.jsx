import React, { useState } from 'react';
import { Button } from 'reactstrap';

const DirectFlightsCheckbox = (props) => {
  return (
      <Button color={props.isDirect ? "success" : "secondary"} onClick={props.toggleIsDirect}>Direct Flights only</Button>
    );
  }
  
  export default DirectFlightsCheckbox;


