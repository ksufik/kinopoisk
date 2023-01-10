import React, { PureComponent } from 'react';

export default class Search extends PureComponent {
  state = {
    search: this.props.moviesObj.search,
  };

  componentDidUpdate(prevProps) {
    if (
      !this.props.moviesObj.search &&
      prevProps.moviesObj.search !== this.props.moviesObj.search
    ) {
      this.setState({
        search: this.props.moviesObj.search,
      });

      const {
        moviesObj: { filters },
        moviesActions,
      } = this.props;
      moviesActions.updatePage(1);
      moviesActions.getMovies({ filters, page: 1 });
    }
  }

  onChange = (event) => {
    this.setState(
      {
        search: event.target.value,
      },
      () => {
        if (!this.state.search) {
          this.props.moviesActions.updateSearch('');
        }
      }
    );
  };

  onSubmit = (event) => {
    event.preventDefault();
    const search = this.state.search;
    if (search) {
			this.props.moviesActions.updateSearch(search);
    }
  };

  render() {
    return (
      <form className="input-group w-50" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control h-100 search__input"
          placeholder="Поиск"
          value={this.state.search}
          label="Поиск"
          aria-label="Search"
          aria-describedby="search-button"
          onChange={this.onChange}
        />
        <button
          className="btn btn-warning p-0 px-2 rounded-right"
          style={{ borderRadius: '0' }}
          type="submit"
          id="search-button"
        >
          <span className="material-icons">search</span>
        </button>
      </form>
    );
  }
}
