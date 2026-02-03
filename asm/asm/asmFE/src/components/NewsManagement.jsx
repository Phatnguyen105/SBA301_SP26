import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NewsArticleService from "../services/NewsArticleService";
import CategoryService from "../services/CategoryService";
import TagService from "../services/TagService";
import "../styles/common.css";

const NewsManagement = () => {
  const { user } = useAuth();
  const [newsArticles, setNewsArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [formData, setFormData] = useState({
    newsTitle: "",
    headline: "",
    newsContent: "",
    newsSource: "",
    categoryId: "",
    newsStatus: true,
    tagIds: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [newsData, categoriesData, tagsData] = await Promise.all([
        NewsArticleService.getAllNewsArticles(),
        CategoryService.getActiveCategories(),
        TagService.getAllTags(),
      ]);
      setNewsArticles(newsData);
      setCategories(categoriesData);
      setTags(tagsData);
      setError("");
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadData();
      return;
    }
    try {
      const data = await NewsArticleService.searchAllNews(searchKeyword);
      setNewsArticles(data);
    } catch (err) {
      setError("Search failed");
    }
  };

  const handleCreate = () => {
    setSelectedNews(null);
    setFormData({
      newsTitle: "",
      headline: "",
      newsContent: "",
      newsSource: "",
      categoryId: "",
      newsStatus: true,
      tagIds: [],
    });
    setShowModal(true);
  };

  const handleEdit = (news) => {
    setSelectedNews(news);
    setFormData({
      newsTitle: news.newsTitle,
      headline: news.headline,
      newsContent: news.newsContent,
      newsSource: news.newsSource || "",
      categoryId: news.categoryId,
      newsStatus: news.newsStatus,
      tagIds: news.tagIds || [],
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      try {
        await NewsArticleService.deleteNewsArticle(id);
        loadData();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete news article");
      }
    }
  };

  const handleTagChange = (tagId) => {
    const tagIdNum = parseInt(tagId);
    if (formData.tagIds.includes(tagIdNum)) {
      setFormData({
        ...formData,
        tagIds: formData.tagIds.filter((id) => id !== tagIdNum),
      });
    } else {
      setFormData({
        ...formData,
        tagIds: [...formData.tagIds, tagIdNum],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        createdById: selectedNews ? selectedNews.createdById : user.accountId,
        updatedById: selectedNews ? user.accountId : null,
      };

      if (selectedNews) {
        await NewsArticleService.updateNewsArticle(selectedNews.newsArticleId, submitData);
      } else {
        await NewsArticleService.createNewsArticle(submitData);
      }
      setShowModal(false);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1>News Article Management</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search news articles..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-success" onClick={handleCreate}>
          Add New Article
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {newsArticles.map((news) => (
              <tr key={news.newsArticleId}>
                <td>{news.newsArticleId}</td>
                <td>{news.newsTitle}</td>
                <td>{news.categoryName}</td>
                <td>{news.createdByName}</td>
                <td>
                  <span className={`badge ${news.newsStatus ? "badge-success" : "badge-danger"}`}>
                    {news.newsStatus ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{new Date(news.createdDate).toLocaleDateString()}</td>
                <td className="actions">
                  <button className="btn btn-primary" onClick={() => handleEdit(news)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(news.newsArticleId)}>
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
              <h2>{selectedNews ? "Edit News Article" : "Create News Article"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.newsTitle}
                    onChange={(e) => setFormData({ ...formData, newsTitle: e.target.value })}
                    required
                    maxLength="200"
                  />
                </div>
                <div className="form-group">
                  <label>Headline *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.headline}
                    onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                    required
                    maxLength="500"
                  />
                </div>
                <div className="form-group">
                  <label>Content *</label>
                  <textarea
                    className="form-control"
                    value={formData.newsContent}
                    onChange={(e) => setFormData({ ...formData, newsContent: e.target.value })}
                    required
                    rows="6"
                  />
                </div>
                <div className="form-group">
                  <label>Source</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.newsSource}
                    onChange={(e) => setFormData({ ...formData, newsSource: e.target.value })}
                    maxLength="100"
                  />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    className="form-control"
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.categoryId} value={cat.categoryId}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status *</label>
                  <select
                    className="form-control"
                    value={formData.newsStatus}
                    onChange={(e) => setFormData({ ...formData, newsStatus: e.target.value === "true" })}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tags</label>
                  <div
                    style={{
                      maxHeight: "150px",
                      overflowY: "auto",
                      border: "1px solid #ced4da",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    {tags.map((tag) => (
                      <div key={tag.tagId} style={{ marginBottom: "5px" }}>
                        <label style={{ fontWeight: "normal", cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={formData.tagIds.includes(tag.tagId)}
                            onChange={() => handleTagChange(tag.tagId)}
                            style={{ marginRight: "8px" }}
                          />
                          {tag.tagName}
                        </label>
                      </div>
                    ))}
                  </div>
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

export default NewsManagement;
