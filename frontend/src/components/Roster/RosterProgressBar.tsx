import React from "react";
import { Progress } from "reactstrap";

interface RosterProgressBarProps {
  isOffender: boolean;
  keepPrice: number;
  taxLine: number;
  maxCap: number;
}

const RosterProgressBar = (props: RosterProgressBarProps) => {
  const { isOffender, keepPrice, taxLine, maxCap } = props;
  return (
    <Progress
      multi
      style={{
        height: "60px",
      }}
    >
      <Progress
        bar
        color="success"
        value={isOffender ? 55 : (keepPrice / maxCap) * 100}
      >
        Under the Tax
      </Progress>
      <Progress
        bar
        color="warning"
        value={isOffender ? ((keepPrice - taxLine) / maxCap) * 100 : 0}
      >
        $ Over
      </Progress>
      <Progress
        bar
        color="danger"
        value={isOffender ? ((keepPrice - taxLine) / maxCap) * 100 : 0}
      >
        $ Penalty
      </Progress>
    </Progress>
  );
};

export default RosterProgressBar;
