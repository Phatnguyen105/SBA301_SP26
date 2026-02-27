import React, { useEffect, useState } from 'react'
import { getAllRooms } from '../../api/rooms'
import { createBooking } from '../../api/bookings'
import { useAuth } from '../../context/AuthContext'

export default function BookingPage() {
  const { user } = useAuth()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [selectedRooms, setSelectedRooms] = useState([])
  const [form, setForm] = useState({ startDate: '', endDate: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getAllRooms()
      .then((res) => setRooms((res.data || []).filter((r) => Number(r.roomStatus) === 1)))
      .catch(() => setError('Failed to load available rooms.'))
      .finally(() => setLoading(false))
  }, [])

  const toggleRoom = (roomId) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    )
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const calculateTotal = () => {
    if (!form.startDate || !form.endDate) return 0
    const start = new Date(form.startDate)
    const end = new Date(form.endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    if (days <= 0) return 0
    return selectedRooms.reduce((sum, rid) => {
      const room = rooms.find((r) => r.roomId === rid)
      return sum + (room?.roomPricePerDay || 0) * days
    }, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (selectedRooms.length === 0) {
      setError('Please select at least one room.')
      return
    }
    const start = new Date(form.startDate)
    const end = new Date(form.endDate)
    if (end <= start) {
      setError('End date must be after start date.')
      return
    }
    setSubmitting(true)
    try {
      const payload = {
        customerId: user.customerId || user.id,
        details: selectedRooms.map((roomId) => {
          const room = rooms.find((r) => r.roomId === roomId)
          return {
            roomId,
            startDate: form.startDate,
            endDate: form.endDate,
            actualPrice: room?.roomPricePerDay || 0,
          }
        }),
      }
      console.log('Booking payload:', payload)
      await createBooking(payload)
      setSuccess('Booking created successfully! Check your booking history.')
      setSelectedRooms([])
      setForm({ startDate: '', endDate: '' })
    } catch (err) {
      const data = err.response?.data
      console.error('Booking error:', err.response)
      setError(typeof data === 'string' ? data : data?.message || JSON.stringify(data) || 'Booking failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">Book a Room</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="card">
          <h3 style={{ marginBottom: 16, color: '#1a237e' }}>1. Select Dates</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Check-in Date</label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={form.startDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label>Check-out Date</label>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={form.endDate}
                onChange={handleChange}
                min={form.startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16, color: '#1a237e' }}>2. Select Rooms</h3>
          {loading ? (
            <div className="loading">Loading available rooms...</div>
          ) : rooms.length === 0 ? (
            <div className="alert alert-info">No available rooms at the moment.</div>
          ) : (
            <div className="room-checkbox-list">
              {rooms.map((room) => (
                <label key={room.roomId} className="room-checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedRooms.includes(room.roomId)}
                    onChange={() => toggleRoom(room.roomId)}
                  />
                  <div style={{ flex: 1 }}>
                    <strong>Room {room.roomNumber}</strong>
                    {' — '}
                    <span style={{ color: '#2e7d32' }}>${room.roomPricePerDay?.toLocaleString()}/day</span>
                    {' · '}
                    <span style={{ color: '#666', fontSize: '0.85rem' }}>
                      {room.roomType?.roomTypeName || room.roomType?.typeName || 'N/A'} · Max {room.roomMaxCapacity} guests
                    </span>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 12, color: '#1a237e' }}>3. Summary</h3>
          <p><strong>Rooms selected:</strong> {selectedRooms.length}</p>
          <p style={{ fontSize: '1.1rem', marginTop: 8 }}>
            <strong>Estimated Total:</strong>{' '}
            <span style={{ color: '#2e7d32', fontSize: '1.3rem' }}>${calculateTotal().toLocaleString()}</span>
          </p>
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginTop: 16, minWidth: 160 }}
            disabled={submitting || selectedRooms.length === 0}
          >
            {submitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  )
}
