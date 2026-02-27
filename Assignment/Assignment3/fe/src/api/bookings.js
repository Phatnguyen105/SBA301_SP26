import api from './axios'

export const getAllBookings = () => api.get('/bookings')
export const getBookingsByCustomer = (customerId) => api.get(`/bookings/customer/${customerId}`)
export const getBookingById = (id) => api.get(`/bookings/${id}`)
export const getBookingDetails = (id) => api.get(`/bookings/${id}/details`)
export const createBooking = (data) => api.post('/bookings', data)
export const deleteBooking = (id) => api.delete(`/bookings/${id}`)
