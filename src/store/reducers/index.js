
import { createSlice } from '@reduxjs/toolkit';
import { getDetailsThunk, addDetailsThunk, deleteDetailsThunk, updateDetailsThunk } from '../middleware';

const initialState = {
  getDetails: {
    loading: false,
    status: false,
    error: false,
    message: '',
    response: [],
  },
  addDetails: {
    loading: false,
    status: false,
    error: false,
    message: '',
    response: [],
  },
  deleteDetails: {
    loading: false,
    status: false,
    error: false,
    message: '',
    response: [],
  },
  updateDetails: {
    loading: false,
    status: false,
    error: false,
    message: '',
    response: [],
  },
};

const applicationSlice = createSlice({
  name: 'Slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailsThunk.pending, (state) => {
        state.getDetails.loading = true;
        state.getDetails.status = false;
        state.getDetails.error = false;
        state.getDetails.message = '';
        state.getDetails.response = '';
      })
      .addCase(getDetailsThunk.fulfilled, (state, action) => {
        state.getDetails.loading = false;
        state.getDetails.status = true;
        state.getDetails.error = false;
        state.getDetails.message = action.payload.response.message;
        state.getDetails.response = action.payload.response.data;
      })
      .addCase(getDetailsThunk.rejected, (state, action) => {
        state.getDetails.loading = false;
        state.getDetails.status = false;
        state.getDetails.error = true;
        state.getDetails.message = action.payload.response.message;
      })
      .addCase(addDetailsThunk.pending, (state) => {
        state.addDetails.loading = true;
        state.addDetails.status = false;
        state.addDetails.error = false;
        state.addDetails.message = '';
        state.addDetails.response = '';
      })
      .addCase(addDetailsThunk.fulfilled, (state, action) => {
        state.addDetails.loading = false;
        state.addDetails.status = true;
        state.addDetails.error = false;
        state.addDetails.message = action.payload.response.message;
        state.addDetails.response = action.payload.response.data;
      })
      .addCase(addDetailsThunk.rejected, (state, action) => {
        state.addDetails.loading = false;
        state.addDetails.status = false;
        state.addDetails.error = true;
        state.addDetails.message = action.payload.response.message;
      })
      .addCase(deleteDetailsThunk.pending, (state) => {
        state.deleteDetails.loading = true;
        state.deleteDetails.status = false;
        state.deleteDetails.error = false;
        state.deleteDetails.message = '';
        state.deleteDetails.response = '';
      })
      .addCase(deleteDetailsThunk.fulfilled, (state, action) => {
        state.deleteDetails.loading = false;
        state.deleteDetails.status = true;
        state.deleteDetails.error = false;
        state.deleteDetails.message = action.payload.response.message;
        state.deleteDetails.response = action.payload.response.data;
      })
      .addCase(deleteDetailsThunk.rejected, (state, action) => {
        state.deleteDetails.loading = false;
        state.deleteDetails.status = false;
        state.deleteDetails.error = true;
        state.deleteDetails.message = action.payload.response.message;
      })
      .addCase(updateDetailsThunk.pending, (state) => {
        state.updateDetails.loading = true;
        state.updateDetails.status = false;
        state.updateDetails.error = false;
        state.updateDetails.message = '';
        state.updateDetails.response = '';
      })
      .addCase(updateDetailsThunk.fulfilled, (state, action) => {
        state.updateDetails.loading = false;
        state.updateDetails.status = true;
        state.updateDetails.error = false;
        state.updateDetails.message = action.payload.response.message;
        state.updateDetails.response = action.payload.response.data;
      })
      .addCase(updateDetailsThunk.rejected, (state, action) => {
        state.updateDetails.loading = false;
        state.updateDetails.status = false;
        state.updateDetails.error = true;
        state.updateDetails.message = action.payload.response.message;
      });
  },
});

export const applicationReducer = applicationSlice.reducer;
