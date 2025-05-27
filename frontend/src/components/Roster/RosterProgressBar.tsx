import { Progress } from "reactstrap";

interface RosterProgressBarProps {
  keepPrice: number;
  taxLine: number;
  maxCap: number;
}

const RosterProgressBar = (props: RosterProgressBarProps) => {
  const { keepPrice, taxLine, maxCap } = props;
  const isOffender = keepPrice > taxLine;
  return (
    <Progress
      multi
      style={{
        height: "60px",
      }}
    >
      <Progress
        bar
        className="success"
        value={isOffender ? 55 : (keepPrice / maxCap) * 100}
      >
        Under the Tax
      </Progress>
      <Progress
        bar
        className="warning"
        value={isOffender ? ((keepPrice - taxLine) / maxCap) * 100 : 0}
      >
        ${keepPrice - taxLine}
      </Progress>
      <Progress
        bar
        className="penalty"
        value={isOffender ? ((keepPrice - taxLine) / maxCap) * 100 : 0}
      >
        ${keepPrice - taxLine}
      </Progress>
    </Progress>
  );
};

export default RosterProgressBar;
