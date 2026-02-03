import api from "./api";

const TagService = {
  getAllTags: async () => {
    const response = await api.get("/tags");
    return response.data;
  },

  getTagById: async (id) => {
    const response = await api.get(`/tags/${id}`);
    return response.data;
  },

  searchTags: async (keyword) => {
    const response = await api.get("/tags/search", {
      params: { keyword },
    });
    return response.data;
  },

  createTag: async (tagData) => {
    const response = await api.post("/tags", tagData);
    return response.data;
  },

  updateTag: async (id, tagData) => {
    const response = await api.put(`/tags/${id}`, tagData);
    return response.data;
  },

  deleteTag: async (id) => {
    const response = await api.delete(`/tags/${id}`);
    return response.data;
  },
};

export default TagService;
