import { FAVORITES_CLICKED } from '../user/user.actions';
import {
  RESET_FILTERS,
  UPDATE_FILTERS,
  UPDATE_MOVIES,
  UPDATE_PAGE,
  UPDATE_FAVORITES,
  UPDATE_ALL_FAVORITES,
  DELETE_FAVORITE,
  ADD_FAVORITE,
} from './movies.actions';

const initialState = {
  movies: [],
  total_results: null,
  total_pages: null,
  filters: {
    sort_by: 'popularity.desc',
    primary_release_year: new Date().getFullYear().toString(),
    with_genres: [],
  },
  page: 1,
  favorites: [],
  favorites_all: [],
  fav_all_total_results: null,
};

export const moviesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_MOVIES:
      return {
        //иммутабельность
        ...state,
        movies: payload.movies,
        total_results: payload.total_results,
        total_pages: payload.total_pages,
      };
    case UPDATE_FILTERS:
      return {
        //иммутабельность
        ...state,
        filters: {
          ...state.filters,
          [payload.name]: payload.value,
        },
      };
    case RESET_FILTERS:
      return {
        //иммутабельность
        ...state,
        filters: initialState.filters,
      };
    case UPDATE_PAGE:
      return {
        ...state,
        page: payload.page,
      };
    case UPDATE_FAVORITES:
      return {
        ...state,
        favorites: payload.movies,
        total_pages: payload.total_pages,
        total_results: payload.total_results,
      };
    case FAVORITES_CLICKED:
      return {
        ...state,
        filters: {
          ...state.filters,
          sort_by: !payload.clicked ? 'popularity.desc' : 'created_at.desc',
        },
      };
    case UPDATE_ALL_FAVORITES:
      return {
        ...state,
        favorites_all: [...state.favorites_all, ...payload.movies],
        fav_all_total_results: payload.total_results,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites_all: [...state.favorites_all, payload.movie],
      };
    case DELETE_FAVORITE:
      const new_favorites_all = state.favorites_all.filter(
        (favorite) => favorite.id !== payload.movie.id
      );
			const new_favorites = state.favorites.filter(
        (favorite) => favorite.id !== payload.movie.id
      );
      return {
        ...state,
        favorites_all: new_favorites_all,
				favorites: new_favorites,
      };

    default:
      return state;
  }
};
