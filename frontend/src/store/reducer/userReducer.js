import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import api from '@/config/api'

export const getUser = createAsyncThunk('user/getUser', async (body, thunkAPI) => {
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
  user: null,
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers:(builder) => {
    builder.addCase(getUser.pending, (state, payload) => {
      state.loading = true
    })
    builder.addCase(getUser.fulfilled, (state, payload) => {
      state.user = payload
      state.loading = false
    }) 
    builder.addCase(getUser.rejected, (state, payload) => {
      state.loading = false
    })
  }
})

// Action creators are generated for each case reducer function

export default user.reducer