import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrls from "../../BaseUrls/BaseUrls";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BaseUrls.BaseUrl}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BaseUrls.BaseUrl}/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    // Add state for login form fields
    loginForm: {
      email: '',
      password: '',
    },
    // Keep registration form fields
    registrationForm: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Optionally clear forms on logout
      state.loginForm = { email: '', password: '' };
      state.registrationForm = { name: '', email: '', password: '', confirmPassword: '' };
    },
    // Reducer to update individual login form fields
    setLoginFormField: (state, action) => {
      const { field, value } = action.payload;
      state.loginForm[field] = value;
      state.error = null; // Clear error when a field is updated
    },
    // Reducer to update individual registration form fields
    setRegistrationFormField: (state, action) => {
      const { field, value } = action.payload;
      state.registrationForm[field] = value;
      state.error = null; // Clear error when a field is updated
    },
    // Reducer to set a specific error message
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Reducer to clear the error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
        state.loginForm = { email: '', password: '' }; // Clear login form on success
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || 'Failed to login.';
      })
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
        state.registrationForm = { name: '', email: '', password: '', confirmPassword: '' }; // Clear registration form on success
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || 'Failed to register.';
      });
  },
});

export const { logout, setLoginFormField, setRegistrationFormField, setError, clearError } = authSlice.actions;

export default authSlice.reducer;