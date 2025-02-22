import React from "react";
import { Button, ButtonGroup } from "reactstrap";

/*
 * This component creates a button group of years that the user can toggle between
 */

// interface yearSelectorProps {
//   selectedYear: string;
//   onChange: (year: string) => void;
//   yearOptions: string[];
// }

const YearSelector = (props) => {
  const isCurrentYear = (yearButton) => {
    return props.selectedYear === yearButton ? "primary" : "secondary";
  };

  return (
    <ButtonGroup>
      {props.yearOptions.map((year) => {
        return (
          <Button
            color={isCurrentYear(year)}
            key={year}
            onClick={() => {
              props.onChange(year);
            }}
          >
            {year}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default YearSelector;
