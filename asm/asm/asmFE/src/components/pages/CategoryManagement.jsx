import React, { useState, useEffect } from "react";
import CategoryService from "../../services/CategoryService";
import "../../styles/common.css";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryDescription: "",
    parentCategoryId: null,
    isActive: true,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getAllCategories();
      setCategories(data);
      setError("");
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadCategories();
      return;
    }
    try {
      const data = await CategoryService.searchCategories(searchKeyword);
      setCategories(data);
    } catch (err) {
      setError("Search failed");
    }
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setFormData({
      categoryName: "",
      categoryDescription: "",
      parentCategoryId: null,
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription || "",
      parentCategoryId: category.parentCategoryId || null,
      isActive: category.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await CategoryService.deleteCategory(id);
        loadCategories();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete category");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCategory) {
        await CategoryService.updateCategory(selectedCategory.categoryId, formData);
      } else {
        await CategoryService.createCategory(formData);
      }
      setShowModal(false);
      loadCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1>Category Management</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search categories..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-success" onClick={handleCreate}>
          Add New Category
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td>
                <td>{category.categoryName}</td>
                <td>{category.categoryDescription}</td>
                <td>
                  <span className={`badge ${category.isActive ? "badge-success" : "badge-danger"}`}>
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn btn-primary" onClick={() => handleEdit(category)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(category.categoryId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{selectedCategory ? "Edit Category" : "Create Category"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Category Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.categoryName}
                    onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    value={formData.categoryDescription}
                    onChange={(e) => setFormData({ ...formData, categoryDescription: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Status *</label>
                  <select
                    className="form-control"
                    value={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
