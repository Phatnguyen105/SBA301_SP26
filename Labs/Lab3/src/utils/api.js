import axiosClient from "./axiosClient";

export const orchidAPI = {
  // READ: lấy toàn bộ orchids
  getAll: async () => {
    const res = await axiosClient.get("/orchids");
    return res.data;
  },

  // READ: lấy orchid theo id
  getById: async (id) => {
    const res = await axiosClient.get(`/orchids/${id}`);
    return res.data;
  },

  // CREATE: thêm orchid mới
  create: async (data) => {
    const res = await axiosClient.post("/orchids", data);
    return res.data;
  },

  // UPDATE: cập nhật orchid
  update: async (id, data) => {
    const res = await axiosClient.put(`/orchids/${id}`, data);
    return res.data;
  },

  // DELETE: xoá orchid
  delete: async (id) => {
    await axiosClient.delete(`/orchids/${id}`);
  },

  // SEARCH: tìm kiếm (json-server hỗ trợ q)
  search: async (keyword) => {
    const res = await axiosClient.get(`/orchids?q=${keyword}`);
    return res.data;
  },
};
