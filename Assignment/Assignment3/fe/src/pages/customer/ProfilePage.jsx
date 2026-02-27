import React, { useEffect, useState } from 'react'
import { getCustomerById, updateCustomer } from '../../api/customers'
import { useAuth } from '../../context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()
  const [form, setForm] = useState({
    customerFullName: '',
    customerEmail: '',
    customerTelephone: '',
    customerBirthday: '',
    password: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!user?.customerId) {
      // Populate from stored user data if no customerId
      setForm((f) => ({ ...f, email: user?.email || '' }))
      setLoading(false)
      return
    }
    getCustomerById(user.customerId)
      .then((res) => {
        const c = res.data
        setForm({
          customerFullName: c.customerFullName || '',
          customerEmail: c.customerEmail || '',
          customerTelephone: c.customerTelephone || '',
          customerBirthday: c.customerBirthday ? c.customerBirthday.substring(0, 10) : '',
          password: '',
        })
      })
      .catch(() => {
        // If staff-only endpoint blocks, fall back to stored data
        setForm((f) => ({ ...f, email: user?.email || '' }))
        setError('Could not load full profile. Some fields may be unavailable.')
      })
      .finally(() => setLoading(false))
  }, [user])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!user?.customerId) {
      setError('Customer ID not found. Please log in again.')
      return
    }
    setSubmitting(true)
    try {
      const payload = { ...form }
      if (!payload.password) delete payload.password
      await updateCustomer(user.customerId, payload)
      setSuccess('Profile updated successfully.')
    } catch (err) {
      setError(err.response?.data || 'Update failed.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="page"><div className="loading">Loading profile...</div></div>

  return (
    <div className="page">
      <h1 className="page-title">My Profile</h1>
      <div className="card" style={{ maxWidth: 560 }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="customerFullName"
              className="form-control"
              value={form.customerFullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              name="customerEmail"
              type="email"
              className="form-control"
              value={form.customerEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Telephone</label>
              <input
                name="customerTelephone"
                className="form-control"
                value={form.customerTelephone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Birthday</label>
              <input
                name="customerBirthday"
                type="date"
                className="form-control"
                value={form.customerBirthday}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>New Password <span style={{ color: '#888', fontWeight: 400 }}>(leave blank to keep current)</span></label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter new password..."
              minLength={6}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}
