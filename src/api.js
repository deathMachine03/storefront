import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getUserIdByDomain = async (domain) => {
  const res = await axios.get(`${API_BASE}/domain/${domain}`);
  return res.data;
};


export const fetchLiveSettings = async (userId) => {
  const res = await axios.get(`${API_BASE}/settings/live/${userId}`);
  return res.data;
};

export const fetchLiveProducts = async (userId) => {
  const res = await axios.get(`${API_BASE}/products/live/${userId}`);
  return res.data;
};

export const fetchLiveProductById = async (userId, id) => {
  const res = await axios.get(`${API_BASE}/products/live/${userId}/${id}`);
  return res.data;
};
