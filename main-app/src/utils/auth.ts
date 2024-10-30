import jwtDecode from 'jwt-decode';

export const getToken = () => localStorage.getItem('token');

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}; 