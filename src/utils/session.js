export const saveSession = (user) => localStorage.setItem('user', JSON.stringify(user));
export const getSession = () => JSON.parse(localStorage.getItem('user'));
export const clearSession = () => localStorage.removeItem('user');
