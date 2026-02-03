import Axios from "./axios";

const CATEGORY_API = "/api/categories";

export const getAllCategories = () => {
  return Axios.get(CATEGORY_API);
};
