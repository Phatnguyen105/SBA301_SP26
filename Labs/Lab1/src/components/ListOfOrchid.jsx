import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Orchid from "./Orchid";

function ListOfOrchid({ orchids }) {
  return (
    <main className="flex-fill py-4">
      <Container>
        <h1 className="text-center mb-4">WELCOME TO MY WEBSITE</h1>
        <Row>
          {orchids.map((orchid) => (
            <Col md={6} lg={3} className="mb-4" key={orchid.id}>
              <Orchid {...orchid} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default ListOfOrchid;
