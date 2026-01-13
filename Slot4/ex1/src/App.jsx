import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Anh from "../public/images/anh.jpg";
import ListOfOrchid from "./components/ListOfOrchid";
import FilterSearch from "./components/FilterSearch";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onSearchChange={handleSearchChange} />

      <main className="flex-fill py-4">
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
      </main>

      <Footer avatar={Anh} name="Phat" email="Phat@fpt.edu.vn" />
    </div>
  );
}

export default App;
