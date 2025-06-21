const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchData = async () => {
  const res = await fetch(`${API_BASE}/api/users`);
  return res.json();
};
