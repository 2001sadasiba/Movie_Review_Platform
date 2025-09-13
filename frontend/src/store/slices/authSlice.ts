import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type{ PayloadAction } from '@reduxjs/toolkit';
import { loginUser as loginApi, registerUser as registerApi } from '../../services';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('authToken'),
    isAuthenticated: !!localStorage.getItem('authToken'),
    loading: false,
    error: null,
};

// Login async thunk
export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginApi(credentials);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

// Register async thunk
export const registerUser = createAsyncThunk(
    'auth/register',
    async (
        payload: { firstName: string; middleName?: string; lastName: string; email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await registerApi({ ...payload, role: 'user' });
            return response.data; 
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('authToken');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
            state.loading = false;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('authToken', action.payload.token);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Register
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
            state.loading = false;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem('authToken', action.payload.token);
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
