import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card } from "react-bootstrap";

function Orchid({
  id,
  orchidName,
  description,
  category,
  isSpecial,
  image,
  price,

  // admin props
  isAdmin = false,
  onEdit,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <Card className="h-100 border-0 shadow-sm overflow-hidden">
      <div style={{ position: "relative" }}>
        <Card.Img
          variant="top"
          src={image}
          alt={orchidName}
          style={{ height: 210, objectFit: "cover" }}
        />

        {isSpecial && (
          <Badge
            bg="danger"
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              borderRadius: 999,
            }}
          >
            Best Seller
          </Badge>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <Card.Title style={{ fontSize: 18 }}>
            {orchidName}
          </Card.Title>
          {price && (
            <strong>
              {new Intl.NumberFormat("vi-VN").format(price)}đ
            </strong>
          )}
        </div>

        <div className="text-muted mb-2">{category}</div>

        <Card.Text style={{ fontSize: 14 }}>
          {description}
        </Card.Text>

        <div className="mt-auto d-flex gap-2">
          {!isAdmin ? (
            <>
              <Button
                size="sm"
                variant="outline-primary"
                onClick={() => navigate(`/orchid/${id}`)}
              >
                Xem chi tiết
              </Button>
              <Button size="sm" variant="primary">
                Mua ngay
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="warning"
                onClick={() => onEdit?.()}
              >
                Sửa
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete?.()}
              >
                Xoá
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default Orchid;
