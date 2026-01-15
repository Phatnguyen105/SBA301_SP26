//SearchBar.jsx to search orchids by name
import React from 'react';
import { Form } from 'react-bootstrap';

function SearchBar({ onSearchChange }) {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <Form>
      <Form.Group controlId="searchOrchids" className="mb-0">
        <Form.Control
          type="text"
          placeholder="Search orchid..."
          onChange={handleSearchChange}
          style={{ width: "250px" }}
        />
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
