import React, { useEffect, useState } from 'react'
import { getAllBookings, getBookingDetails, createBooking, deleteBooking } from '../../api/bookings'
import { getAllCustomers } from '../../api/customers'
import { getAvailableRooms } from '../../api/rooms'

const emptyBookingForm = { customerId: '', startDate: '', endDate: '', roomIds: [] }

export default function BookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [detailsModal, setDetailsModal] = useState(null)
  const [details, setDetails] = useState([])
  const [loadingDetails, setLoadingDetails] = useState(false)

  // Create booking state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [bookingForm, setBookingForm] = useState(emptyBookingForm)
  const [customers, setCustomers] = useState([])
  const [availableRooms, setAvailableRooms] = useState([])
  const [createError, setCreateError] = useState('')
  const [loadingCreate, setLoadingCreate] = useState(false)

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const res = await getAllBookings()
      setBookings(res.data)
    } catch {
      setError('Failed to load bookings.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBookings() }, [])

  const openCreateModal = async () => {
    setBookingForm(emptyBookingForm)
    setCreateError('')
    setLoadingCreate(true)
    setShowCreateModal(true)
    try {
      const [custRes, roomRes] = await Promise.all([getAllCustomers(), getAvailableRooms()])
      setCustomers(custRes.data)
      setAvailableRooms(roomRes.data)
    } catch {
      setCreateError('Failed to load customers/rooms.')
    } finally {
      setLoadingCreate(false)
    }
  }

  const toggleRoom = (roomId) => {
    setBookingForm((f) => ({
      ...f,
      roomIds: f.roomIds.includes(roomId)
        ? f.roomIds.filter((id) => id !== roomId)
        : [...f.roomIds, roomId],
    }))
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault()
    setCreateError('')
    if (bookingForm.roomIds.length === 0) {
      setCreateError('Please select at least one room.')
      return
    }
    try {
      await createBooking({
        customerId: Number(bookingForm.customerId),
        startDate: bookingForm.startDate,
        endDate: bookingForm.endDate,
        roomIds: bookingForm.roomIds,
      })
      setSuccess('Booking created successfully.')
      setShowCreateModal(false)
      fetchBookings()
    } catch (err) {
      setCreateError(err.response?.data || 'Create failed.')
    }
  }

  const openDetails = async (booking) => {
    setDetailsModal(booking)
    setLoadingDetails(true)
    try {
      const res = await getBookingDetails(booking.bookingReservationId)
      setDetails(res.data)
    } catch {
      setDetails([])
    } finally {
      setLoadingDetails(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return
    try {
      await deleteBooking(id)
      setSuccess('Booking deleted.')
      fetchBookings()
    } catch (err) {
      setError(err.response?.data || 'Delete failed.')
    }
  }

  return (
    <div className="page">
      <div className="toolbar">
        <h1 className="page-title" style={{ marginBottom: 0 }}>Booking Reservations</h1>
        <button className="btn btn-primary" onClick={openCreateModal}>+ Add Booking</button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <div className="card">
        {loading ? (
          <div className="loading">Loading bookings...</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Book Date</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b.bookingReservationId}>
                    <td>{i + 1}</td>
                    <td>{b.bookingReservationId}</td>
                    <td>{b.customer?.fullName || b.customerId || '-'}</td>
                    <td>{b.bookingDate ? b.bookingDate.substring(0, 10) : '-'}</td>
                    <td>{b.startDate ? b.startDate.substring(0, 10) : '-'}</td>
                    <td>{b.endDate ? b.endDate.substring(0, 10) : '-'}</td>
                    <td>${b.totalPrice?.toLocaleString() || '0'}</td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-primary btn-sm" onClick={() => openDetails(b)}>Details</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.bookingReservationId)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr><td colSpan={8} style={{ textAlign: 'center', color: '#888' }}>No bookings found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {detailsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Booking #{detailsModal.bookingReservationId} — Details</h3>
              <button className="modal-close" onClick={() => setDetailsModal(null)}>×</button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p><strong>Customer:</strong> {detailsModal.customer?.fullName || '-'}</p>
              <p><strong>Period:</strong> {detailsModal.startDate?.substring(0, 10)} → {detailsModal.endDate?.substring(0, 10)}</p>
              <p><strong>Total Price:</strong> ${detailsModal.totalPrice?.toLocaleString()}</p>
            </div>
            <h4 style={{ marginBottom: 10, color: '#1a237e' }}>Rooms Booked</h4>
            {loadingDetails ? (
              <div className="loading">Loading details...</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Room No.</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Price ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((d, i) => (
                    <tr key={i}>
                      <td>{d.room?.roomNumber || d.roomId}</td>
                      <td>{d.startDate?.substring(0, 10)}</td>
                      <td>{d.endDate?.substring(0, 10)}</td>
                      <td>${d.actualPrice?.toLocaleString()}</td>
                    </tr>
                  ))}
                  {details.length === 0 && (
                    <tr><td colSpan={4} style={{ textAlign: 'center', color: '#888' }}>No details.</td></tr>
                  )}
                </tbody>
              </table>
            )}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDetailsModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Booking</h3>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
            </div>
            {createError && <div className="alert alert-danger">{createError}</div>}
            {loadingCreate ? (
              <div className="loading">Loading data...</div>
            ) : (
              <form onSubmit={handleCreateSubmit}>
                <div className="form-group">
                  <label>Customer</label>
                  <select
                    className="form-control"
                    value={bookingForm.customerId}
                    onChange={(e) => setBookingForm((f) => ({ ...f, customerId: e.target.value }))}
                    required
                  >
                    <option value="">-- Select Customer --</option>
                    {customers.map((c) => (
                      <option key={c.customerId} value={c.customerId}>{c.fullName} ({c.emailAddress})</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={bookingForm.startDate}
                      onChange={(e) => setBookingForm((f) => ({ ...f, startDate: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={bookingForm.endDate}
                      onChange={(e) => setBookingForm((f) => ({ ...f, endDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Select Rooms ({bookingForm.roomIds.length} selected)</label>
                  <div className="room-checkbox-list">
                    {availableRooms.length === 0 && (
                      <div style={{ padding: 10, color: '#888' }}>No available rooms.</div>
                    )}
                    {availableRooms.map((r) => (
                      <label key={r.roomId} className="room-checkbox-item">
                        <input
                          type="checkbox"
                          checked={bookingForm.roomIds.includes(r.roomId)}
                          onChange={() => toggleRoom(r.roomId)}
                        />
                        <span>
                          <strong>Room {r.roomNumber}</strong> — {r.roomType?.typeName || 'N/A'} — ${r.roomPricePerDay?.toLocaleString()}/day — Cap: {r.roomMaxCapacity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Create Booking</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
