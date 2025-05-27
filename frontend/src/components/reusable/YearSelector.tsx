import React from "react";
import { Button, ButtonGroup } from "reactstrap";

/*
 * This component creates a button group of years that the user can toggle between
 */

interface yearSelectorProps {
  selectedYear: string;
  onChange: (year: string) => void;
  yearOptions: string[];
}

const YearSelector = (props: yearSelectorProps) => {
  const isCurrentYear = (yearButton: string) => {
    return props.selectedYear === yearButton ? "primary" : "secondary";
  };

  return (
    <ButtonGroup className="year-selector" id="year-selector">
      {props.yearOptions.map((year: string) => {
        return (
          <Button
            color={isCurrentYear(year)}
            key={year}
            id={`${year}-btn`}
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
