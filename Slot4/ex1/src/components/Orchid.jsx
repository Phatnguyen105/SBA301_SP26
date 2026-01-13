import React, { useState } from "react";
import { Card, Badge, Button, Modal } from "react-bootstrap";

function Orchid({ orchidName, description, category, isSpecial, image, onDetailClick, id }) {
  const [showModal, setShowModal] = useState(false);
  const maxLength = 100; // Số ký tự hiển thị khi rút gọn
  
  const truncatedDescription = description.length > maxLength 
    ? description.substring(0, maxLength) + "..." 
    : description;

  const handleDetailClick = () => {
    setShowModal(true);
    if (onDetailClick) {
      onDetailClick(id || orchidName);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card className="orchid-card h-100 shadow">
        <Card.Img
          variant="top"
          src={image}
          className="orchid-image"
          alt={orchidName}
        />

        <Card.Body className="d-flex flex-column">
          <Card.Title className="orchid-title">
            {orchidName}
            {isSpecial && (
              <Badge bg="danger" className="ms-2">
                Special
              </Badge>
            )}
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted orchid-category">
            {category}
          </Card.Subtitle>

          <Card.Text className="orchid-desc flex-grow-1">
            {truncatedDescription}
          </Card.Text>

          <Button 
            variant="primary" 
            className="mt-auto"
            onClick={handleDetailClick}
          >
            Detail
          </Button>
        </Card.Body>
      </Card>

      {/* Modal hiển thị chi tiết */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{orchidName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <img 
              src={image} 
              alt={orchidName}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="mb-2">
            <strong>Category:</strong> {category}
            {isSpecial && (
              <Badge bg="danger" className="ms-2">
                Special
              </Badge>
            )}
          </div>
          <div>
            <strong>Description:</strong>
            <p className="mt-2">{description}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Orchid;