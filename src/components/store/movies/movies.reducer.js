import {
  RESET_FILTERS,
  UPDATE_FILTERS,
  UPDATE_MOVIES,
  UPDATE_PAGE,
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

    default:
      return state;
  }
};
