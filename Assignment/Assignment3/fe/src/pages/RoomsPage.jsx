import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllRooms, createRoom, updateRoom, deleteRoom } from '../api/rooms'
import { getAllRoomTypes } from '../api/roomTypes'
import { useAuth } from '../context/AuthContext'

const emptyForm = {
  roomNumber: '',
  roomDetailDescription: '',
  roomMaxCapacity: '',
  roomPricePerDay: '',
  roomStatus: 1,
  roomTypeId: '',
}

export default function RoomsPage() {
  const { user, isStaff } = useAuth()

  const [rooms, setRooms] = useState([])
  const [roomTypes, setRoomTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [rRes, rtRes] = await Promise.all([getAllRooms(), getAllRoomTypes()])
      setRooms(rRes.data)
      setRoomTypes(rtRes.data)
    } catch (err) {
      const data = err.response?.data
      setError(typeof data === 'string' ? data : data?.message || 'Failed to load rooms.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [])

  const openCreate = () => {
    setEditId(null)
    setForm(emptyForm)
    setFormError('')
    setShowModal(true)
  }

  const openEdit = (r) => {
    setEditId(r.roomId)
    setForm({
      roomNumber: r.roomNumber || '',
      roomDetailDescription: r.roomDetailDescription || '',
      roomMaxCapacity: r.roomMaxCapacity || '',
      roomPricePerDay: r.roomPricePerDay || '',
      roomStatus: r.roomStatus ?? 1,
      roomTypeId: r.roomType?.roomTypeId || r.roomTypeId || '',
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
    setSubmitting(true)
    try {
      const payload = {
        ...form,
        roomMaxCapacity: Number(form.roomMaxCapacity),
        roomPricePerDay: Number(form.roomPricePerDay),
        roomStatus: Number(form.roomStatus),
        roomTypeId: Number(form.roomTypeId),
      }
      if (editId) {
        await updateRoom(editId, payload)
        setSuccess('Room updated successfully.')
      } else {
        await createRoom(payload)
        setSuccess('Room created successfully.')
      }
      setShowModal(false)
      fetchAll()
    } catch (err) {
      const data = err.response?.data
      setFormError(typeof data === 'string' ? data : data?.message || JSON.stringify(data) || 'Operation failed.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this room?')) return
    try {
      await deleteRoom(id)
      setSuccess('Room deleted successfully.')
      fetchAll()
    } catch (err) {
      const data = err.response?.data
      setError(typeof data === 'string' ? data : data?.message || 'Failed to delete room.')
    }
  }

  return (
    <div className="page">
      <div className="hero">
        <h1>FU Mini Hotel System</h1>
        <p>Comfortable rooms at great prices. Book online instantly.</p>
        {!user && (
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Sign In
            </Link>
            <Link to="/register" className="btn btn-success" style={{ textDecoration: 'none' }}>
              Register
            </Link>
          </div>
        )}
        {(user?.role === 'CUSTOMER' || user?.role === 'ROLE_CUSTOMER') && (
          <Link to="/customer/book" className="btn btn-success" style={{ textDecoration: 'none' }}>
            Book a Room Now
          </Link>
        )}
      </div>

      <div className="toolbar" style={{ alignItems: 'center' }}>
        <h2 className="page-title" style={{ marginBottom: 0 }}>
          {isStaff ? 'Room Management' : 'Available Rooms'}
        </h2>
        {isStaff && (
          <button className="btn btn-primary" onClick={openCreate}>+ Add Room</button>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {loading && <div className="loading">Loading rooms...</div>}

      <div className="room-grid">
        {rooms.map((room) => (
          <div key={room.roomId} className="room-card">
            <h3>Room {room.roomNumber}</h3>
            <div className="price">
              ${room.roomPricePerDay?.toLocaleString()}
              <span style={{ fontSize: '0.75rem', color: '#666' }}> /day</span>
            </div>
            <div className="info">Type: {room.roomType?.typeName || roomTypes.find(rt => rt.roomTypeId === room.roomTypeId)?.typeName || 'N/A'}</div>
            <div className="info">Max occupancy: {room.roomMaxCapacity || 'N/A'} guests</div>
            <div style={{ marginTop: 10 }}>
              <span className={`badge ${room.roomStatus === 1 ? 'badge-available' : 'badge-booked'}`}>
                {room.roomStatus === 1 ? 'Available' : 'Unavailable'}
              </span>
            </div>
            {room.roomDetailDescription && (
              <p style={{ marginTop: 10, fontSize: '0.85rem', color: '#555' }}>
                {room.roomDetailDescription}
              </p>
            )}
            {isStaff && (
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="btn btn-warning btn-sm" style={{ flex: 1 }} onClick={() => openEdit(room)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" style={{ flex: 1 }} onClick={() => handleDelete(room.roomId)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        {!loading && rooms.length === 0 && (
          <p style={{ color: '#888' }}>No rooms found.</p>
        )}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editId ? 'Edit Room' : 'Add New Room'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            {formError && <div className="alert alert-danger">{formError}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Room Number</label>
                  <input name="roomNumber" className="form-control" value={form.roomNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Room Type</label>
                  <select name="roomTypeId" className="form-control" value={form.roomTypeId} onChange={handleChange} required>
                    <option value="">-- Select Type --</option>
                    {roomTypes.map((rt) => (
                      <option key={rt.roomTypeId} value={rt.roomTypeId}>{rt.typeName}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Max Capacity</label>
                  <input name="roomMaxCapacity" type="number" min="1" className="form-control" value={form.roomMaxCapacity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Price per Day ($)</label>
                  <input name="roomPricePerDay" type="number" min="0" step="0.01" className="form-control" value={form.roomPricePerDay} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="roomDetailDescription" className="form-control" rows={3} value={form.roomDetailDescription} onChange={handleChange} style={{ resize: 'vertical' }} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="roomStatus" className="form-control" value={form.roomStatus} onChange={handleChange}>
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : editId ? 'Save Changes' : 'Create Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
