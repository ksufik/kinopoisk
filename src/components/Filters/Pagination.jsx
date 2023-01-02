import React from 'react';
//import PropTypes from 'prop-types';
import { withMovies } from '../HOC/withMovies';

// из-за PureComponent (=shouldComponentUpdate) лишние рендеры компонента при взаимодействии с другими частями фильтра не происходят
class Pagination extends React.PureComponent {
  // static propTypes = {
  //   onChangePage: PropTypes.func.isRequired,
  //   page: PropTypes.number.isRequired,
  //   total_pages: PropTypes.number.isRequired,
  // };

  onChangePage = (page) => {
    this.props.moviesActions.updatePage(page);
  };

  //! ? Глюк при множественном нажатии на любую из кнопок
  nextPage = () => {
    this.onChangePage(this.props.moviesObj.page + 1);
  };

  prevPage = () => {
    this.onChangePage(this.props.moviesObj.page - 1);
  };

  render() {
    const {
      moviesObj: { page, total_pages },
    } = this.props;
    return (
      <React.Fragment>
        <div
          className="btn-group"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <button
            type="button"
            className="btn btn-info"
            disabled={page === 1}
            onClick={this.prevPage}
          >
            Предыдущая
          </button>
          <button
            type="button"
            className="btn btn-info"
            disabled={page === total_pages || total_pages === 0}
            onClick={this.nextPage}
          >
            Следующая
          </button>
        </div>
        <div className="text-center">
          {page} of {total_pages}
        </div>
      </React.Fragment>
    );
  }
}

export default withMovies(Pagination);
