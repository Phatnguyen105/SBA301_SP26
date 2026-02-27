import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  const normalizeRole = (r) => r?.replace('ROLE_', '')
  if (role && normalizeRole(user.role) !== normalizeRole(role)) return <Navigate to="/" replace />

  return children
}
