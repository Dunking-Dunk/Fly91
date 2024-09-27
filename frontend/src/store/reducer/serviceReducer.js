import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '@/config/api';

export const getService = createAsyncThunk('service/getService', async (body, thunkAPI) => {
  try {
      const places = await api.get('/places');
      const data = places.data;
      return data;
  } catch (err) {
      if (err) {
          return thunkAPI.rejectWithValue({ error: err.response.data });
      }
  }
});

const initialState = {
  service: null,
  services: [],
  loading: false
}

export const service = createSlice({
  name: 'service',
  initialState,
  reducers: {

  },
  extraReducers: () => {
    builder.addCase(getService.pending, (state, payload) => {
      state.loading = true
    })
    builder.addCase(getService.fulfilled, (state, payload) => {
      state.user = payload
      state.loading = false
    }) 
    builder.addCase(getService.rejected, (state, payload) => {
      state.loading = false
    })
  }
})

// Action creators are generated for each case reducer function

export default service.reducer