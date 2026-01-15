import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";

function Orchid({ orchidName, description, category, isSpecial, image, id }) {
  const navigate = useNavigate();
  const maxLength = 100; // Số ký tự hiển thị khi rút gọn
  
  const truncatedDescription = description.length > maxLength 
    ? description.substring(0, maxLength) + "..." 
    : description;

  const handleDetailClick = () => {
    if (id) {
      navigate(`/orchid/${id}`);
    }
  };

  return (
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
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Orchid;