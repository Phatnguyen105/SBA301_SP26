import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { orchidAPI } from "../utils/api";
import "./OrchidDetails.css";

function OrchidDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        setLoading(true);
        const data = await orchidAPI.getById(id);
        setOrchid(data);
      } catch (error) {
        console.error("Không tìm thấy orchid:", error);
        setOrchid(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrchid();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p>Đang tải chi tiết orchid...</p>
      </Container>
    );
  }

  if (!orchid) {
    return (
      <div className="orchid-details-page">
        <Container className="py-5">
          <Card className="shadow-lg">
            <Card.Body className="text-center p-5">
              <h2 className="text-danger mb-3">Orchid Not Found</h2>
              <p className="text-muted mb-4">
                The orchid you're looking for doesn't exist.
              </p>
              <Button variant="primary" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="orchid-details-page">
      <Container className="py-5">
        <Button
          variant="outline-secondary"
          className="mb-4 back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        <Row className="g-4">
          {/* Image */}
          <Col lg={6}>
            <Card className="shadow-lg h-100 image-card">
              <div className="image-wrapper">
                <img
                  src={orchid.image}
                  alt={orchid.orchidName}
                  className="orchid-detail-image"
                />
                {orchid.isSpecial && (
                  <Badge className="special-badge" bg="danger">
                    ⭐ Special
                  </Badge>
                )}
              </div>
            </Card>
          </Col>

          {/* Details */}
          <Col lg={6}>
            <Card className="shadow-lg h-100 details-card">
              <Card.Body className="p-4">
                <h1 className="orchid-detail-title">
                  {orchid.orchidName}
                </h1>

                <Badge bg="info" className="mb-3">
                  {orchid.category}
                </Badge>

                <p className="orchid-description">
                  {orchid.description}
                </p>

                <div className="mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate("/contact")}
                  >
                    Contact Us
                  </Button>

                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="ms-2"
                    onClick={() => navigate("/")}
                  >
                    View More Orchids
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OrchidDetails;
