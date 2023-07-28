import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
  photos: [],
  photo: {},
  error: false,
  succcess: false,
  loading: false,
  message: null
}

export const publishPhoto = createAsyncThunk(
  "photo/publish",
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.publishPhoto(photo, token);
    if (data.errors) {
      thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
)

export const getUserPhotos = createAsyncThunk(
  "photo/userphotos",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getUserPhotos(id, token);

    if (data.errors) {
      thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data
  }
);

export const deletePhoto = createAsyncThunk(
  "photo/delete",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.deletePhoto(id, token);

    if (data.errors) {
      thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const updatePhoto = createAsyncThunk(
  "photo/update",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.updatePhoto({
      title: photoData.title
    }, photoData.id, token);

    if (data.errors) {
      thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const getPhotoById = createAsyncThunk(
  "photo/getbyid",
  async (id, thunkAPI) => {

    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhotoById(id, token);

    if (data.errors) {
      thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const likePhoto = createAsyncThunk(
  "photo/like",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.likePhoto(id, token);

    if (data.errors) {
      thunkAPI.rejectWithValue(data.errors[0])
    };

    return data;
  }
)

export const commentPhoto = createAsyncThunk(
  "photo/comment",
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.commentPhoto(
      { comment: photoData.comment },
      photoData.id,
      token
    );

    if (data.errors) {
      thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
)

export const getAllPhotos = createAsyncThunk(
  "photo/getall",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getAllPhotos(token);

    if (data.errors) {
      thunkAPI.rejectWithValue(data.errors[0])
    }

    return data;

  }
)

export const searchPhotos = createAsyncThunk(
  "photo/searchphotos",
  async (query, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.searchPhotos(query,token)

    if(data.errors) {
      thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
)

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Insert
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(publishPhoto.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = "Foto Publicada com sucesso!"
      })
      // Delete
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(deletePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.photos = state.photos.filter((photo) => {
          return photo._id !== action.payload.id;
        });

        state.message = action.payload.message;
      })
      // Update
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(updatePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.photos = state.photos.map(photo => {
          if (photo._id === action.payload.photo.id) {
            return action.payload.photo
          } else {
            return photo
          }
        })
        state.message = action.payload.message;

      })
      // Get User Photos
      .addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.photos = action.payload;
      })
      // Get Photo by ID
      .addCase(getPhotoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = {};
      })
      .addCase(getPhotoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPhotoById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.photo = action.payload;
      })
      // Like Photo
      .addCase(likePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (state.photo.likes) {
          state.photo.likes.push(action.payload.userId)
        }
        state.photos = state.photos.map(photo => {
          if (photo._id === action.payload.photoId) {
            photo.likes.push(action.payload.userId)
          }
          return photo
        })
        state.message = action.payload.message;
      })
      .addCase(commentPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(commentPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        console.log(action.payload);
        state.photo.comments.push(action.payload.comment);
        state.message = action.payload.message;
      })
      // Get All Photos
      .addCase(getAllPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(getAllPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.photos = action.payload;
      })
      // Search Photos
      .addCase(searchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(searchPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.photos = action.payload;
      })
  }
});

export const { resetMessage } = photoSlice.actions;

export default photoSlice.reducer;