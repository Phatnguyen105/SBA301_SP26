import React, { useEffect, useState } from 'react'
import { getAllRooms, createRoom, updateRoom, deleteRoom } from '../../api/rooms'
import { getAllRoomTypes } from '../../api/roomTypes'

const emptyForm = {
  roomNumber: '',
  roomDetailDescription: '',
  roomMaxCapacity: '',
  roomPricePerDay: '',
  roomStatus: 1,
  roomTypeId: '',
}

export default function RoomsManagePage() {
  const [rooms, setRooms] = useState([])
  const [roomTypes, setRoomTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [rRes, rtRes] = await Promise.all([getAllRooms(), getAllRoomTypes()])
      setRooms(rRes.data)
      setRoomTypes(rtRes.data)
    } catch (err) {
      const data = err.response?.data
      setError(typeof data === 'string' ? data : data?.message || 'Failed to load data.')
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
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete or deactivate this room?')) return
    try {
      await deleteRoom(id)
      setSuccess('Room deleted/deactivated successfully.')
      fetchAll()
    } catch (err) {
      const data = err.response?.data
      setError(typeof data === 'string' ? data : data?.message || JSON.stringify(data) || 'Failed to delete room.')
    }
  }

  return (
    <div className="page">
      <div className="toolbar">
        <h1 className="page-title" style={{ marginBottom: 0 }}>Room Management</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Room</button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="card">
        {loading ? (
          <div className="loading">Loading rooms...</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Room No.</th>
                  <th>Type</th>
                  <th>Max Cap.</th>
                  <th>Price/Day</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r, i) => (
                  <tr key={r.roomId}>
                    <td>{i + 1}</td>
                    <td>{r.roomNumber}</td>
                    <td>{r.roomType?.roomTypeName || r.roomType?.typeName || '-'}</td>
                    <td>{r.roomMaxCapacity}</td>
                    <td>${r.roomPricePerDay?.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${r.roomStatus === 1 ? 'badge-available' : 'badge-inactive'}`}>
                        {r.roomStatus === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.roomDetailDescription || '-'}
                    </td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-warning btn-sm" onClick={() => openEdit(r)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.roomId)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {rooms.length === 0 && (
                  <tr><td colSpan={8} style={{ textAlign: 'center', color: '#888' }}>No rooms found.</td></tr>
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
                <button type="submit" className="btn btn-primary">{editId ? 'Save Changes' : 'Create Room'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
