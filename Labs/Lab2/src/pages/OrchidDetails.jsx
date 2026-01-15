import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { OrchidsData } from "../listOrchids";
import "./OrchidDetails.css";

function OrchidDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Memoize orchid search
  const orchid = useMemo(
    () => OrchidsData.find((item) => item.id === id),
    [id]
  );

  // Nếu không tìm thấy orchid
  if (!orchid) {
    return (
      <div className="orchid-details-page">
        <Container className="py-5">
          <Card className="shadow-lg">
            <Card.Body className="text-center p-5">
              <h2 className="text-danger mb-3">Orchid Not Found</h2>
              <p className="text-muted mb-4">The orchid you're looking for doesn't exist.</p>
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
          {/* Image Section */}
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

          {/* Details Section */}
          <Col lg={6}>
            <Card className="shadow-lg h-100 details-card">
              <Card.Body className="p-4">
                <div className="orchid-header mb-4">
                  <h1 className="orchid-detail-title">{orchid.orchidName}</h1>
                  <Badge className="category-badge" bg="info">
                    {orchid.category}
                  </Badge>
                </div>

                <div className="orchid-info mb-4">
                  <div className="info-item">
                    <span className="info-label">🌺 Category:</span>
                    <span className="info-value">{orchid.category}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🆔 ID:</span>
                    <span className="info-value">{orchid.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">⭐ Status:</span>
                    <span className="info-value">
                      {orchid.isSpecial ? "Special Orchid" : "Regular Orchid"}
                    </span>
                  </div>
                </div>

                <div className="description-section">
                  <h4 className="section-title">📝 Description</h4>
                  <p className="orchid-description">{orchid.description}</p>
                </div>

                <div className="action-buttons mt-4">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="action-button"
                    onClick={() => navigate("/contact")}
                  >
                    Contact Us
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="lg"
                    className="action-button ms-2"
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
