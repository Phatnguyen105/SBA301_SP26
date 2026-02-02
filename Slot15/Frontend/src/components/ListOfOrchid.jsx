import React, { useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FilterSort from "./FilterSort";
import Orchid from "./Orchid";

function ListOfOrchid({ orchids = [], searchTerm = "" }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const categories = useMemo(
    () => [...new Set(orchids.map(o => o.category).filter(Boolean))],
    [orchids]
  );

  const filteredOrchids = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    let result = orchids.filter(
      (o) => !selectedCategory || o.category === selectedCategory
    );

    if (normalizedSearch) {
      result = result.filter((o) => {
        const name = (o.orchidName ?? "").toLowerCase();
        const desc = (o.description ?? "").toLowerCase();
        return (
          name.startsWith(normalizedSearch) ||
          desc.includes(normalizedSearch)
        );
      });
    }

    switch (selectedSort) {
      case "price-asc":
        return [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "price-desc":
        return [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case "name-asc":
        return [...result].sort((a, b) =>
          (a.orchidName ?? "").localeCompare(b.orchidName ?? "")
        );
      case "name-desc":
        return [...result].sort((a, b) =>
          (b.orchidName ?? "").localeCompare(a.orchidName ?? "")
        );
      default:
        return result;
    }
  }, [orchids, selectedCategory, searchTerm, selectedSort]);

  return (
    <Container className="py-5">
      <FilterSort
        categories={categories}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
        onFilterChange={setSelectedCategory}
        onSortChange={setSelectedSort}
      />

      {filteredOrchids.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">Không tìm thấy sản phẩm nào</h5>
          <p className="text-muted">Vui lòng thử lại với các bộ lọc khác</p>
        </div>
      ) : (
        <Row>
          {filteredOrchids.map((orchid) => (
            <Col md={6} lg={3} className="mb-4" key={orchid.id}>
              <Orchid {...orchid} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ListOfOrchid;
