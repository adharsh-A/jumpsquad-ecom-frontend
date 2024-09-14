import { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [role, setRole] = useState("")
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, role,expirationDate) => {
    setToken(token);
    setUserId(`${uid}`);
    setRole(role);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        role: role,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setRole(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    try {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        login(storedData.userId, storedData.token, storedData.role, new Date(storedData.expiration));
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
    }
  }, [login]);
  return { token,role, login, logout, userId };
};