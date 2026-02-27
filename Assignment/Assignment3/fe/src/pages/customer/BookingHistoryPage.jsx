import React, { useEffect, useState } from 'react'
import { getBookingsByCustomer, getBookingDetails, deleteBooking } from '../../api/bookings'
import { useAuth } from '../../context/AuthContext'

export default function BookingHistoryPage() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [detailsModal, setDetailsModal] = useState(null)
  const [details, setDetails] = useState([])
  const [loadingDetails, setLoadingDetails] = useState(false)

  const fetchBookings = async () => {
    if (!user?.customerId) return
    setLoading(true)
    try {
      const res = await getBookingsByCustomer(user.customerId)
      setBookings(res.data)
    } catch {
      setError('Failed to load booking history.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBookings() }, [user])

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

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return
    try {
      await deleteBooking(id)
      setSuccess('Booking cancelled.')
      fetchBookings()
    } catch (err) {
      setError(err.response?.data || 'Cancellation failed.')
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">My Booking History</h1>
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
                  <th>Book Date</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b.bookingReservationId}>
                    <td>{i + 1}</td>
                    <td>{b.bookingReservationId}</td>
                    <td>{b.bookingDate ? b.bookingDate.substring(0, 10) : '-'}</td>
                    <td>{b.startDate ? b.startDate.substring(0, 10) : '-'}</td>
                    <td>{b.endDate ? b.endDate.substring(0, 10) : '-'}</td>
                    <td>${b.totalPrice?.toLocaleString() || '0'}</td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-primary btn-sm" onClick={() => openDetails(b)}>Details</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b.bookingReservationId)}>Cancel</button>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', color: '#888', padding: 24 }}>
                      No bookings found. <a href="/customer/book" style={{ color: '#1a237e' }}>Make your first booking!</a>
                    </td>
                  </tr>
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
              <h3>Booking #{detailsModal.bookingReservationId}</h3>
              <button className="modal-close" onClick={() => setDetailsModal(null)}>×</button>
            </div>
            <div style={{ marginBottom: 16, lineHeight: 1.8 }}>
              <p><strong>Book Date:</strong> {detailsModal.bookingDate?.substring(0, 10)}</p>
              <p><strong>Check-in:</strong> {detailsModal.startDate?.substring(0, 10)}</p>
              <p><strong>Check-out:</strong> {detailsModal.endDate?.substring(0, 10)}</p>
              <p><strong>Total Price:</strong> ${detailsModal.totalPrice?.toLocaleString()}</p>
            </div>
            <h4 style={{ marginBottom: 10, color: '#1a237e' }}>Rooms</h4>
            {loadingDetails ? (
              <div className="loading">Loading...</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Room No.</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
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
    </div>
  )
}
