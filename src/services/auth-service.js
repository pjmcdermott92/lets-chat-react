import api from './api';

export const getUser = () => api('auth');

export const loginUser = credentials => api('auth', credentials, 'POST');

export const registerUser = userData => api('auth/register', userData, 'POST');

export const logoutUser = () => api('/auth/logout');
