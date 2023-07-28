import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import usersService from "../services/userService";

const initialState = {
  user: {},
  success: false,
  loading: false,
  message: null
}

export const profile = createAsyncThunk(
  "user/profile",
  async(user,thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await usersService.profile(user, token);

    return data;

  }
)

export const updateProfile = createAsyncThunk(
  "user/update",
  async(user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await usersService.updateProfile(user, token);
    
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  
  }
)

export const getUserDetails = createAsyncThunk(
  "user/get",
  async(id, thunkAPI) => {
    const data = await usersService.getUserDetails(id);

    return data;


  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(profile.pending, (state) => {
        state.loading = true;
      })
      .addCase(profile.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso!"
      })
      .addCase(updateProfile.rejected, (state, action) => {
        console.log(state,action)
        state.loading = false;
        state.error = action.payload;
        state.user = {};
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserDetails.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
  }
});

export const {resetMessage} = userSlice.actions;

export default userSlice.reducer;
