import { useState } from "react";
import ListOfOrchid from "./ListOfOrchid";
import FilterSearch from "./FilterSearch";

function Home({ searchTerm = "" }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">WELCOME TO MY WEBSITE</h1>
      <FilterSearch
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <ListOfOrchid
        selectedCategory={selectedCategory}
        sortOption={sortOption}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default Home;
