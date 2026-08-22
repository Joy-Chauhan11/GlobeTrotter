const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function getToken() {
  return localStorage.getItem("gt_token") || null;
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || res.statusText);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function getTrips() {
  return request(`/api/trips`);
}

export async function createTrip(payload) {
  return request(`/api/trips`, { method: "POST", body: JSON.stringify(payload) });
}

export async function getTrip(tripId) {
  return request(`/api/trips/${tripId}`);
}

export async function updateTrip(tripId, payload) {
  return request(`/api/trips/${tripId}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function deleteTrip(tripId) {
  return request(`/api/trips/${tripId}`, { method: "DELETE" });
}

export async function addStop(tripId, payload) {
  return request(`/api/trips/${tripId}/stops`, { method: "POST", body: JSON.stringify(payload) });
}

export async function addActivity(tripId, stopId, payload) {
  return request(`/api/trips/${tripId}/stops/${stopId}/activities`, { method: "POST", body: JSON.stringify(payload) });
}

export async function getCommunityPosts() {
  return request(`/api/community`);
}

export async function getExploreCities() {
  return request(`/api/explore/cities`);
}

export async function getExploreActivities(query = "") {
  const url = query ? `/api/explore/activities?search=${encodeURIComponent(query)}` : `/api/explore/activities`;
  return request(url);
}

export async function toggleLikePost(postId) {
  return request(`/api/community/${postId}/like`, { method: "POST" });
}

export async function addCommentPost(postId, text) {
  return request(`/api/community/${postId}/comments`, { method: "POST", body: JSON.stringify({ text }) });
}

export async function getAdminUsers() {
  return request(`/api/admin/users`);
}

export async function getAdminPopularCities() {
  return request(`/api/admin/popular-cities`);
}

export async function getAdminPopularActivities() {
  return request(`/api/admin/popular-activities`);
}

export async function getAdminAnalytics() {
  return request(`/api/admin/analytics`);
}

export async function suggestStops(destination) {
  return request(`/api/ai/suggest-stops?destination=${encodeURIComponent(destination)}`);
}

export async function suggestActivities(stop) {
  return request(`/api/ai/suggest-activities?stop=${encodeURIComponent(stop)}`);
}

export default {
  getTrips,
  createTrip,
  getTrip,
  updateTrip,
  deleteTrip,
  addStop,
  addActivity,
  getCommunityPosts,
  getExploreCities,
  getExploreActivities,
  toggleLikePost,
  addCommentPost,
  getAdminUsers,
  getAdminPopularCities,
  getAdminPopularActivities,
  getAdminAnalytics,
  suggestStops,
  suggestActivities,
};
