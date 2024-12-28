import React from "react";
import { Progress } from "reactstrap";

const RosterProgressBar = (props) => {
  const { isOffender, keepPrice, TAX_LINE, MAX_CAP } = props;
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
        value={isOffender ? 55 : (keepPrice / MAX_CAP) * 100}
      >
        Under the Tax
      </Progress>
      <Progress
        bar
        color="warning"
        value={isOffender ? ((keepPrice - TAX_LINE) / MAX_CAP) * 100 : 0}
      >
        $ Over
      </Progress>
      <Progress
        bar
        color="danger"
        value={isOffender ? ((keepPrice - TAX_LINE) / MAX_CAP) * 100 : 0}
      >
        $ Penalty
      </Progress>
    </Progress>
  );
};

export default RosterProgressBar;
