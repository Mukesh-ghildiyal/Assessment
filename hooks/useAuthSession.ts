// hooks/useAuthSession.ts
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setAuth, clearAuth } from '../store/authSlice';
import axios from 'axios';

export const useAuthSession = () => {
  const dispatch = useDispatch();
  const { token, username } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth-check', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status !== 200) {
          dispatch(clearAuth());
        }
      } catch {
        dispatch(clearAuth());
      }
    };

    if (token) {
      checkAuth();
    }
  }, [token, dispatch]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      dispatch(setAuth({ token: response.data.token, username: response.data.username }));
    } catch {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    dispatch(clearAuth());
  };

  return { token, username, login, logout };
};
