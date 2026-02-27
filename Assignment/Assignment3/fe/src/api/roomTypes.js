import api from './axios'

export const getAllRoomTypes = () => api.get('/room-types')
export const getRoomTypeById = (id) => api.get(`/room-types/${id}`)
export const createRoomType = (data) => api.post('/room-types', data)
export const updateRoomType = (id, data) => api.put(`/room-types/${id}`, data)
export const deleteRoomType = (id) => api.delete(`/room-types/${id}`)
