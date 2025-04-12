import { Spinner } from "reactstrap";

interface SpinnerWrapperProps {
  loading: boolean;
}

export default function SpinnerWrapper(props: SpinnerWrapperProps) {
  return (
    <>
      {props.loading && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
    </>
  );
}
