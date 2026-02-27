import React, { useEffect, useState } from 'react'
import { getAllRoomTypes, createRoomType, updateRoomType, deleteRoomType } from '../../api/roomTypes'

const emptyForm = { typeName: '', typeDescription: '', typeNote: '' }

export default function RoomTypesPage() {
  const [roomTypes, setRoomTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')

  const fetchRoomTypes = async () => {
    setLoading(true)
    try {
      const res = await getAllRoomTypes()
      setRoomTypes(res.data)
    } catch {
      setError('Failed to load room types.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRoomTypes() }, [])

  const openCreate = () => {
    setEditId(null)
    setForm(emptyForm)
    setFormError('')
    setShowModal(true)
  }

  const openEdit = (rt) => {
    setEditId(rt.roomTypeId)
    setForm({
      typeName: rt.typeName || rt.roomTypeName || '',
      typeDescription: rt.typeDescription || '',
      typeNote: rt.typeNote || '',
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
      if (editId) {
        await updateRoomType(editId, form)
        setSuccess('Room type updated.')
      } else {
        await createRoomType(form)
        setSuccess('Room type created.')
      }
      setShowModal(false)
      fetchRoomTypes()
    } catch (err) {
      setFormError(err.response?.data || 'Operation failed.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this room type?')) return
    try {
      await deleteRoomType(id)
      setSuccess('Room type deleted.')
      fetchRoomTypes()
    } catch (err) {
      setError(err.response?.data || 'Delete failed.')
    }
  }

  return (
    <div className="page">
      <div className="toolbar">
        <h1 className="page-title" style={{ marginBottom: 0 }}>Room Types</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Room Type</button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="card">
        {loading ? (
          <div className="loading">Loading room types...</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type Name</th>
                  <th>Description</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roomTypes.map((rt, i) => (
                  <tr key={rt.roomTypeId}>
                    <td>{i + 1}</td>
                    <td>{rt.roomTypeName || rt.typeName}</td>
                    <td>{rt.typeDescription || '-'}</td>
                    <td>{rt.typeNote || '-'}</td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-warning btn-sm" onClick={() => openEdit(rt)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(rt.roomTypeId)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {roomTypes.length === 0 && (
                  <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>No room types found.</td></tr>
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
              <h3>{editId ? 'Edit Room Type' : 'Add Room Type'}</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            {formError && <div className="alert alert-danger">{formError}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Type Name</label>
                <input name="typeName" className="form-control" value={form.typeName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="typeDescription" className="form-control" rows={3} value={form.typeDescription} onChange={handleChange} style={{ resize: 'vertical' }} />
              </div>
              <div className="form-group">
                <label>Note</label>
                <input name="typeNote" className="form-control" value={form.typeNote} onChange={handleChange} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editId ? 'Save Changes' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
