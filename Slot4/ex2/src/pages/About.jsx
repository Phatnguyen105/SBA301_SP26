import { Container, Card, Row, Col } from "react-bootstrap";

function About() {
  return (
    <div className="about-page">
      <Container className="py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <h1 className="about-title">About Us</h1>
            <p className="about-subtitle">Connect with us through various channels</p>
          </div>
        </div>

        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="info-card h-100 shadow-sm">
              <Card.Body className="p-4 text-center">
                <div className="icon-wrapper email-icon">
                  <span className="icon">✉️</span>
                </div>
                <h5 className="mt-3 mb-2">Email</h5>
                <p className="text-muted mb-0">contact@example.com</p>
                <a href="mailto:contact@example.com" className="contact-link">Send Email</a>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="info-card h-100 shadow-sm">
              <Card.Body className="p-4 text-center">
                <div className="icon-wrapper phone-icon">
                  <span className="icon">📞</span>
                </div>
                <h5 className="mt-3 mb-2">Phone</h5>
                <p className="text-muted mb-0">+84 123 456 789</p>
                <a href="tel:+84123456789" className="contact-link">Call Now</a>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="info-card h-100 shadow-sm">
              <Card.Body className="p-4 text-center">
                <div className="icon-wrapper address-icon">
                  <span className="icon">📍</span>
                </div>
                <h5 className="mt-3 mb-2">Address</h5>
                <p className="text-muted mb-0">
                  123 Main Street<br />
                  Ho Chi Minh City, Vietnam
                </p>
                <a href="#" className="contact-link">Get Directions</a>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={6}>
            <Card className="hours-card shadow-sm h-100">
              <Card.Header className="hours-header">
                <h4 className="mb-0">🕐 Business Hours</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="hours-item">
                  <div className="day">Monday - Friday</div>
                  <div className="time">9:00 AM - 6:00 PM</div>
                </div>
                <div className="hours-item">
                  <div className="day">Saturday</div>
                  <div className="time">9:00 AM - 4:00 PM</div>
                </div>
                <div className="hours-item">
                  <div className="day">Sunday</div>
                  <div className="time closed">Closed</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="social-card shadow-sm h-100">
              <Card.Header className="social-header">
                <h4 className="mb-0">🌐 Follow Us</h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="social-links">
                  <a href="#" className="social-link facebook">
                    <span className="social-icon">📘</span>
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="social-link twitter">
                    <span className="social-icon">🐦</span>
                    <span>Twitter</span>
                  </a>
                  <a href="#" className="social-link instagram">
                    <span className="social-icon">📷</span>
                    <span>Instagram</span>
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
