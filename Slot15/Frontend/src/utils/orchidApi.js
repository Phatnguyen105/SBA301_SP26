import Axios from "./axios";

const ORCHID_API = "/api/orchids";

export const getAllOrchids = () => {
  return Axios.get(ORCHID_API);
};

export const getOrchidById = (id) => {
  return Axios.get(`${ORCHID_API}/${id}`);
};

export const createOrchid = (data) => {
  return Axios.post(ORCHID_API, data);
};

export const updateOrchid = (id, data) => {
  return Axios.put(`${ORCHID_API}/${id}`, data);
};

export const deleteOrchid = (id) => {
  return Axios.delete(`${ORCHID_API}/${id}`);
};
