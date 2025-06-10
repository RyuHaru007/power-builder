export const contentType = 'application/json';

export const getBaseUrl = (path: string = '') => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
  if (!baseUrl) {
    throw new Error('Backend URL not configured. Please set VITE_BACKEND_URL or REACT_APP_BACKEND_URL in your environment variables.');
  }
  return `${baseUrl}/${path}`;
};