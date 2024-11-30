import axios from 'axios';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE } from './types';

// 로그인 액션
export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:8080/api/login', credentials);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    throw error;
  }
};

// 로그아웃 액션
export const logout = () => async (dispatch) => {
  try {
    await axios.post('http://localhost:8080/api/logout');
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    throw error;
  }
};

// 회원가입 액션
export const signup = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:8080/api/signup', userData);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    throw error;
  }
};

// 프로필 업데이트 액션
export const updateProfile = (updatedData) => async (dispatch) => {
  try {
    const res = await axios.put('/api/user/update', updatedData);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.message,
    });
  }
};
