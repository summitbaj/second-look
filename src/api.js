import { demoProfile } from './demo';
export async function getProfile() {
  const base = import.meta.env.VITE_API_URL;
  if (!base) return demoProfile;
  const response = await fetch(`${base.replace(/\/$/, '')}/profile`);
  if (!response.ok) throw new Error('We could not load your profile. Please try again.');
  return response.json();
}
