import { configureStore } from '@reduxjs/toolkit';
import { moviesReducer } from './movies/movies.reducer';
import { userReducer } from './user/user.reducer';

const store = configureStore({
  reducer: { user: userReducer, movies: moviesReducer },
});

export default store;
