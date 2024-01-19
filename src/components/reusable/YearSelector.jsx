import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const RECORDED_YEARS = ["2020", "2021", "2022", "2023", "2024"];

/*
 * This component creates a button group of years that the user can toggle between
 */
const YearSelector = (props) => {
  const isCurrentYear = (whichButton) => {
    return props.selectedYear === whichButton ? "primary" : "secondary";
  };

  return (
    <ButtonGroup>
      {RECORDED_YEARS.map((year) => {
        return (
          <Button
            color={isCurrentYear(year)}
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
