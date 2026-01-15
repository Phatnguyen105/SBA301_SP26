import React, { useMemo } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Orchid from "./Orchid";
import listOrchids from "../listOrchids";

function ListOrchid({ selectedCategory = "", sortOption = "", searchTerm = "" }) {
  // Lấy danh sách categories duy nhất từ listOrchids
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(listOrchids.map((orchid) => orchid.category))];
    return uniqueCategories;
  }, []);

  // Xử lý filter và sort
  const filteredAndSortedOrchids = useMemo(() => {
    let result = [...listOrchids];

    // Filter theo search term (tên)
    if (searchTerm) {
      result = result.filter((orchid) =>
        orchid.orchidName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter theo category
    if (selectedCategory) {
      result = result.filter((orchid) => orchid.category === selectedCategory);
    }

    // Sort
    if (sortOption) {
      result = [...result].sort((a, b) => {
        switch (sortOption) {
          case "price-asc":
            return (a.price || 0) - (b.price || 0);
          case "price-desc":
            return (b.price || 0) - (a.price || 0);
          case "name-asc":
            return a.orchidName.localeCompare(b.orchidName);
          case "name-desc":
            return b.orchidName.localeCompare(a.orchidName);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [selectedCategory, sortOption, searchTerm]);

  const count = filteredAndSortedOrchids.length;

  return (
    <Container className="py-5">
      {/* Hiển thị số lượng orchid */}
      <Alert variant="info" className="mb-4">
        <strong>Số lượng orchid: {count}</strong>
      </Alert>

      <Row>
        {filteredAndSortedOrchids.length > 0 ? (
          filteredAndSortedOrchids.map((orchid) => (
            <Col md={6} lg={3} className="mb-4" key={orchid.id}>
              <Orchid
                id={orchid.id}
                orchidName={orchid.orchidName}
                description={orchid.description}
                category={orchid.category}
                isSpecial={orchid.isSpecial}
                image={orchid.image}
              />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="warning" className="text-center">
              Không tìm thấy orchid nào phù hợp với bộ lọc.
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default ListOrchid;
