import React, { useEffect, useState } from 'react'
import { getAllCustomers, createCustomer, updateCustomer, deleteCustomer } from '../../api/customers'

const emptyForm = { customerFullName: '', customerEmail: '', customerTelephone: '', customerBirthday: '', customerStatus: 1, password: '' }

export default function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editCustomer, setEditCustomer] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      const res = await getAllCustomers()
      setCustomers(res.data)
    } catch {
      setError('Failed to load customers.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCustomers() }, [])

  const openCreate = () => {
    setEditCustomer(null)
    setForm(emptyForm)
    setFormError('')
    setShowModal(true)
  }

  const openEdit = (c) => {
    setEditCustomer(c)
    setForm({
      fullName: c.fullName || c.customerName || c.full_name || '',
      email: c.emailAddress || c.email || c.customerEmail || '',
      telephone: c.telephone || c.phone || c.phoneNumber || '',
      birthday: (c.birthday || c.dateOfBirth) ? (c.birthday || c.dateOfBirth).substring(0, 10) : '',
      customerStatus: c.customerStatus ?? 1,
      password: '',
    })
    setFormError('')
    setShowModal(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    try {
      if (editCustomer) {
        await updateCustomer(editCustomer.customerId, form)
        setSuccess('Customer updated successfully.')
      } else {
        await createCustomer(form)
        setSuccess('Customer created successfully.')
      }
      setShowModal(false)
      fetchCustomers()
    } catch (err) {
      setFormError(err.response?.data || (editCustomer ? 'Update failed.' : 'Create failed.'))
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Deactivate this customer?')) return
    try {
      await deleteCustomer(id)
      setSuccess('Customer deactivated.')
      fetchCustomers()
    } catch (err) {
      setError(err.response?.data || 'Delete failed.')
    }
  }

  return (
    <div className="page">
      <div className="toolbar">
        <h1 className="page-title" style={{ marginBottom: 0 }}>Customer Management</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Customer</button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="card">
        {loading ? (
          <div className="loading">Loading customers...</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Telephone</th>
                  <th>Birthday</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr key={c.customerId}>
                    <td>{i + 1}</td>
                    <td>{c.customerFullName || '-'}</td>
                    <td>{c.customerEmail || '-'}</td>
                    <td>{c.customerTelephone || '-'}</td>
                    <td>{c.customerBirthday ? c.customerBirthday.substring(0, 10) : '-'}</td>
                    <td>
                      <span className={`badge ${c.customerStatus === 1 ? 'badge-active' : 'badge-inactive'}`}>
                        {c.customerStatus === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-warning btn-sm" onClick={() => openEdit(c)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.customerId)}>
                        Deactivate
                      </button>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr><td colSpan={7} style={{ textAlign: 'center', color: '#888' }}>No customers found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editCustomer ? 'Edit Customer' : 'Add New Customer'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            {formError && <div className="alert alert-danger">{formError}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input name="customerFullName" className="form-control" value={form.customerFullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="customerEmail" type="email" className="form-control" value={form.customerEmail} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Telephone</label>
                  <input name="customerTelephone" className="form-control" value={form.customerTelephone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Birthday</label>
                  <input name="customerBirthday" type="date" className="form-control" value={form.customerBirthday} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="customerStatus" className="form-control" value={form.customerStatus} onChange={handleChange}>
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
              {!editCustomer && (
                <div className="form-group">
                  <label>Password</label>
                  <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} required />
                </div>
              )}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editCustomer ? 'Save Changes' : 'Create Customer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
