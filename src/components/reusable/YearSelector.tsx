import React from "react";
import { Button, ButtonGroup } from "reactstrap";

const RECORDED_YEARS = ["2020", "2021", "2022", "2023", "2024", "2025"];

/*
 * This component creates a button group of years that the user can toggle between
 */

interface yearSelectorProps {
  selectedYear: string;
  onChange: (year: string) => void;
}

const YearSelector = (props: yearSelectorProps) => {
  const isCurrentYear = (whichButton: string) => {
    return props.selectedYear === whichButton ? "primary" : "secondary";
  };

  return (
    <ButtonGroup>
      {RECORDED_YEARS.map((year: string) => {
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
