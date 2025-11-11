import axios from "axios";

const API_URL = "https://6912da4152a60f10c822fc73.mockapi.io/products";

export const getProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

export const updateProduct = async (product) => {
  const res = await axios.put(`${API_URL}/${product.id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
