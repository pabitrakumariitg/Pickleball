export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to construct API URLs
export const getApiUrl = (path: string) => {
  // Remove any leading slashes from the path
  const cleanPath = path.replace(/^\/+/, '');
  return `${API_URL}/${cleanPath}`;
}; 