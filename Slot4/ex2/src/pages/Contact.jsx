import { useState } from "react";
import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
import ConfirmModal from "../components/ConfirmModal";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ""));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone must be 10-11 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Form is valid, show confirm modal
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = () => {
    // Close modal
    setShowConfirmModal(false);
    // Form is valid, show success message
    setShowSuccess(true);
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      agree: false,
    });
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const confirmModalBody = (
    <div>
      <p>Bạn có chắc chắn muốn gửi thông tin liên hệ này không?</p>
      <div className="confirm-details">
        <p><strong>Họ tên:</strong> {formData.firstName} {formData.lastName}</p>
        <p><strong>Số điện thoại:</strong> {formData.phone}</p>
        <p><strong>Email:</strong> {formData.email}</p>
      </div>
    </div>
  );

  return (
    <div className="contact-page">
      <Container className="py-5">
        <div className="row justify-content-center mb-4">
          <div className="col-12 text-center">
            <h1 className="contact-title">Get In Touch</h1>
            <p className="contact-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <Card className="contact-card shadow-lg">
              <Card.Body className="p-5">
                {showSuccess && (
                  <Alert 
                    variant="success" 
                    dismissible 
                    onClose={() => setShowSuccess(false)}
                    className="success-alert"
                  >
                    <strong>✓ Success!</strong> Form submitted successfully! We will contact you soon.
                  </Alert>
                )}

                <ConfirmModal
                  show={showConfirmModal}
                  handleClose={handleCloseModal}
                  title="Xác nhận gửi form"
                  body={confirmModalBody}
                  onConfirm={handleConfirm}
                />

                <Form onSubmit={handleSubmit} className="contact-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4 form-group-custom">
                        <Form.Label className="form-label-custom">
                          First Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          isInvalid={!!errors.firstName}
                          placeholder="John"
                          className="form-control-custom"
                        />
                        <Form.Control.Feedback type="invalid" className="error-feedback">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4 form-group-custom">
                        <Form.Label className="form-label-custom">
                          Last Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          isInvalid={!!errors.lastName}
                          placeholder="Doe"
                          className="form-control-custom"
                        />
                        <Form.Control.Feedback type="invalid" className="error-feedback">
                          {errors.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4 form-group-custom">
                    <Form.Label className="form-label-custom">
                      📞 Phone Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      placeholder="0123456789"
                      className="form-control-custom"
                    />
                    <Form.Control.Feedback type="invalid" className="error-feedback">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4 form-group-custom">
                    <Form.Label className="form-label-custom">
                      ✉️ Email Address <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      placeholder="john.doe@example.com"
                      className="form-control-custom"
                    />
                    <Form.Control.Feedback type="invalid" className="error-feedback">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4 form-group-custom">
                    <div className="checkbox-wrapper">
                      <Form.Check
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        isInvalid={!!errors.agree}
                        className="custom-checkbox"
                        label={
                          <span className="checkbox-label">
                            I agree to the terms and conditions <span className="text-danger">*</span>
                          </span>
                        }
                      />
                      {errors.agree && (
                        <div className="text-danger small mt-2 error-feedback">{errors.agree}</div>
                      )}
                    </div>
                  </Form.Group>

                  <div className="d-grid mt-4">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      className="submit-button"
                    >
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Contact;
