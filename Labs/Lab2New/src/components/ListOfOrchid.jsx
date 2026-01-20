import React, { useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FilterSort from "./FilterSort";
import Orchid from "./Orchid";

function ListOrchid({ orchids, searchTerm = "" }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const categories = useMemo(
    () => [...new Set(orchids.map((orchid) => orchid.category).filter(Boolean))],
    [orchids]
  );

  const filteredOrchids = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    let result = orchids.filter(
      (orchid) => !selectedCategory || orchid.category === selectedCategory
    );

    if (normalizedSearch) {
      result = result.filter((orchid) => {
        const name = (orchid.orchidName ?? "").toLowerCase();
        const desc = (orchid.description ?? "").toLowerCase();
        return name.startsWith(normalizedSearch) || desc.includes(normalizedSearch);
      });
    }

    if (selectedSort === "price-asc") {
      result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (selectedSort === "price-desc") {
      result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (selectedSort === "name-asc") {
      result.sort((a, b) =>
        (a.orchidName ?? "").localeCompare(b.orchidName ?? "")
      );
    } else if (selectedSort === "name-desc") {
      result.sort((a, b) =>
        (b.orchidName ?? "").localeCompare(a.orchidName ?? "")
      );
    }

    return result;
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

export default ListOrchid;
