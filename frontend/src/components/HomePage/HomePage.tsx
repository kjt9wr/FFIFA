import React from "react";
import { Container } from "reactstrap";

const HomePage = () => {
  return (
    <Container className="homepage-container">
      <h1 className="homepage-quote cursiveFont">
        “Si vis pacem, para bellum”
      </h1>
      <h2 className="homepage-attribution cursiveFont">
        —If you want peace, prepare for war
      </h2>
    </Container>
  );
};

export default HomePage;
