import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Fetch employees
export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/employees');
      return response.data; // Assuming the API returns an array of employees
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch employees');
    }
  }
);

// Create user and employee
export const createUserAndEmployee = createAsyncThunk(
  'employee/createUserAndEmployee',
  async (userAndEmployeeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user-employee', userAndEmployeeData);
      return response.data; // Assuming the API returns { user, employee }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create user and employee');
    }
  }
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (employeeId, { rejectWithValue }) => {
    try {
      await api.delete(`/employees/${employeeId}`);
      return employeeId; // Return the deleted employee's ID
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete employee');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    user: null,
    employee: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUserAndEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserAndEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.employee = action.payload.employee;
        state.employees.push(action.payload.employee);
      })
      .addCase(createUserAndEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
