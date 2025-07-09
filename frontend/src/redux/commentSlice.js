import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/comments";

// Get user & token from localStorage
const getUser = () => JSON.parse(localStorage.getItem("user"));
const getToken = () => localStorage.getItem("token");

// Fetch all comments for a video
export const fetchComments = createAsyncThunk("comments/fetchComments", async (videoId, thunkAPI) => {
  try {
    const res = await axios.get(`${API}/video/${videoId}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch comments");
  }
});

// Add a new comment
export const addComment = createAsyncThunk("comments/addComment", async ({ videoId, text }, thunkAPI) => {
  try {
    const token = getToken();
    const res = await axios.post(
      `${API}/video/${videoId}`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add comment");
  }
});

// Delete a comment
export const deleteComment = createAsyncThunk("comments/deleteComment", async (commentId, thunkAPI) => {
  try {
    const token = getToken();
    await axios.delete(`${API}/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return commentId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete comment");
  }
});

// Edit a comment
export const editComment = createAsyncThunk("comments/editComment", async ({ commentId, text }, thunkAPI) => {
  try {
    const token = getToken();
    const res = await axios.put(
      `${API}/${commentId}`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to edit comment");
  }
});

// Slice
const commentSlice = createSlice({
  name: "comments",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetComments: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchComments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addComment
      .addCase(addComment.fulfilled, (state, action) => {
        state.list.unshift(action.payload); // add new comment at top
      })

      // deleteComment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c._id !== action.payload);
      })

      // editComment
      .addCase(editComment.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export const { resetComments } = commentSlice.actions;
export default commentSlice.reducer;
