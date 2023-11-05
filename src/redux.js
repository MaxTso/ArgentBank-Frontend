import { configureStore, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    clearUser: state => {
      return {}
    }
  }
})


export const store = configureStore({
  reducer: {
    Auth: authSlice.reducer,
    User: userSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export const { setUser, clearUser } = userSlice.actions
export const { setToken, clearToken } = authSlice.actions