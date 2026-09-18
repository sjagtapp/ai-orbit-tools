import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

export async function fetchTools(params = {}) {
  const { data } = await api.get('/tools', { params });
  return data;
}

export async function fetchToolBySlug(slug) {
  const { data } = await api.get(`/tools/${slug}`);
  return data;
}

export async function fetchCategories() {
  const { data } = await api.get('/categories');
  return data;
}

export async function fetchRelatedTools(slug) {
  const { data } = await api.get(`/tools/related/${slug}`);
  return data;
}

export async function fetchReviews(toolId) {
  const { data } = await api.get(`/tools/${toolId}/reviews`);
  return data;
}

export async function submitReview(toolId, payload) {
  const { data } = await api.post(`/tools/${toolId}/reviews`, payload);
  return data;
}

export default api;
