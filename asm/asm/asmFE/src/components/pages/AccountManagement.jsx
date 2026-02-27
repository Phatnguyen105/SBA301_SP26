import React, { useState, useEffect } from "react";
import AccountService from "../../services/AccountService";
import "../../styles/common.css";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    accountName: "",
    accountEmail: "",
    accountRole: 2,
    accountPassword: "",
  });

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const data = await AccountService.getAllAccounts();
      setAccounts(data);
      setError("");
    } catch (err) {
      setError("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadAccounts();
      return;
    }
    try {
      const data = await AccountService.searchAccounts(searchKeyword);
      setAccounts(data);
    } catch (err) {
      setError("Search failed");
    }
  };

  const handleCreate = () => {
    setSelectedAccount(null);
    setFormData({
      accountName: "",
      accountEmail: "",
      accountRole: 2,
      accountPassword: "",
    });
    setShowModal(true);
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    setFormData({
      accountName: account.accountName,
      accountEmail: account.accountEmail,
      accountRole: account.accountRole,
      accountPassword: "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        await AccountService.deleteAccount(id);
        loadAccounts();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete account");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAccount) {
        await AccountService.updateAccount(selectedAccount.accountId, formData);
      } else {
        await AccountService.createAccount(formData);
      }
      setShowModal(false);
      loadAccounts();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1>Account Management</h1>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search accounts..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-success" onClick={handleCreate}>
          Add New Account
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.accountId}>
                <td>{account.accountId}</td>
                <td>{account.accountName}</td>
                <td>{account.accountEmail}</td>
                <td>
                  <span className={`badge ${account.accountRole === 1 ? "badge-warning" : "badge-info"}`}>
                    {account.accountRole === 1 ? "Admin" : "Staff"}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn btn-primary" onClick={() => handleEdit(account)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(account.accountId)}>
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
              <h2>{selectedAccount ? "Edit Account" : "Create Account"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.accountName}
                    onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.accountEmail}
                    onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <select
                    className="form-control"
                    value={formData.accountRole}
                    onChange={(e) => setFormData({ ...formData, accountRole: parseInt(e.target.value) })}
                    required
                  >
                    <option value="1">Admin</option>
                    <option value="2">Staff</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Password {selectedAccount ? "(leave blank to keep current)" : "*"}</label>
                  <input
                    type="password"
                    className="form-control"
                    value={formData.accountPassword}
                    onChange={(e) => setFormData({ ...formData, accountPassword: e.target.value })}
                    required={!selectedAccount}
                  />
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

export default AccountManagement;
