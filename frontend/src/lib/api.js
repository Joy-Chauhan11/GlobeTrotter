const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
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

export default { getTrips, createTrip, getTrip, updateTrip, deleteTrip };
