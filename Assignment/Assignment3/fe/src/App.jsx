import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

// Public pages
import RoomsPage from './pages/RoomsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

// Staff pages
import StaffCustomersPage from './pages/staff/CustomersPage'
import StaffRoomsPage from './pages/staff/RoomsManagePage'
import StaffRoomTypesPage from './pages/staff/RoomTypesPage'
import StaffBookingsPage from './pages/staff/BookingsPage'

// Customer pages
import CustomerBookPage from './pages/customer/BookingPage'
import CustomerHistoryPage from './pages/customer/BookingHistoryPage'
import CustomerProfilePage from './pages/customer/ProfilePage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<RoomsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Staff */}
          <Route path="/staff/customers" element={
            <ProtectedRoute role="STAFF"><StaffCustomersPage /></ProtectedRoute>
          } />
          <Route path="/staff/rooms" element={
            <ProtectedRoute role="STAFF"><StaffRoomsPage /></ProtectedRoute>
          } />
          <Route path="/staff/room-types" element={
            <ProtectedRoute role="STAFF"><StaffRoomTypesPage /></ProtectedRoute>
          } />
          <Route path="/staff/bookings" element={
            <ProtectedRoute role="STAFF"><StaffBookingsPage /></ProtectedRoute>
          } />

          {/* Customer */}
          <Route path="/customer/book" element={
            <ProtectedRoute role="CUSTOMER"><CustomerBookPage /></ProtectedRoute>
          } />
          <Route path="/customer/history" element={
            <ProtectedRoute role="CUSTOMER"><CustomerHistoryPage /></ProtectedRoute>
          } />
          <Route path="/customer/profile" element={
            <ProtectedRoute role="CUSTOMER"><CustomerProfilePage /></ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
