import CallApi from '../../api';

export const UPDATE_MOVIES = 'MOVIES::UPDATE_MOVIES';
export const UPDATE_FILTERS = 'MOVIES::UPDATE_FILTERS';
export const RESET_FILTERS = 'MOVIES::RESET_FILTERS';
export const UPDATE_PAGE = 'MOVIES::UPDATE_PAGE';

export const updateMovies = ({ movies, total_results, total_pages }) => ({
  type: UPDATE_MOVIES,
  payload: {
    movies,
    total_results,
    total_pages,
  },
});

export const updateFilters = (event) => ({
  type: UPDATE_FILTERS,
  payload: {
    name: event.name,
    value: event.value,
  },
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});

export const updatePage = (page) => ({
  type: UPDATE_PAGE,
  payload: { page },
});

export const getMovies = (filters, page) => async (dispatch) => {
  //dispatch(animeLoading());

  // строка ниже идентична const sort_by = this.props.filters.sort_by
  const { sort_by, primary_release_year, with_genres } = filters;
  // со всеми параметрами получается огромная строка, поэтому используем библиотеку query-string, которая преобразует объект в строку
  const queryParams = {
    sort_by: sort_by,
    page: page,
    primary_release_year: primary_release_year,
  };

  if (with_genres.length > 0) {
    queryParams.with_genres = with_genres.join(',');
  }

  CallApi.get('discover/movie', {
    params: queryParams,
  }).then((data) => {
    // if (!this.props.getFavoritesIsClicked) {
    //   this.props.onChangePage({
    //     page: data.page,
    //     total_pages: data.total_pages,
    //   });
    // }
    const total_results = data.total_results;
    const total_pages = data.total_pages;
    const movies = data.results;
    dispatch(updateMovies({ movies, total_results, total_pages }));
  });
};
