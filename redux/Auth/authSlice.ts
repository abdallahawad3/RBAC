import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8000/api/v1/auth/login";

interface User {
  _id: string;
  name: string;
  slug: string;
  email: string;
  role: string;
  active: boolean;
  wishlist: string[];
  addresses: {
    alias: string;
    details: string;
    phone: string;
    city: string;
    postalCode: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,
  token: Cookies.get("token") || null,
  role: Cookies.get("role") || null,
  loading: false,
  error: null,
};

// ✅ Login Action with Redirection
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API_URL, { email, password });
      const { data, token } = response.data; // Extract user data and token
      const role = data.role; // Extract role

      // ✅ Store token, user, and role in cookies (1-day expiry)
      Cookies.set("token", token, { expires: 1 });
      Cookies.set("role", role, { expires: 1 });
      Cookies.set("user", JSON.stringify(data), { expires: 1 });

      return { user: data, token, role };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Login failed");
      } else {
        return rejectWithValue("Login failed");
      }
    }
  }
);

// ✅ Redux Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
