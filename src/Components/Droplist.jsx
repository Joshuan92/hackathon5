import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Droplist = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} size='lg'>
      <DropdownToggle color={props.color} caret>
        {props.title}
      </DropdownToggle>
      <DropdownMenu>
        {props.options.map((option, index) => {
          const handleClick = () => {
            props.setAirport(option);
          };
          return (
            <DropdownItem key={index} onClick={handleClick}>
              {option}{" "}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default Droplist;

<Droplist title={"Dog"} />;
