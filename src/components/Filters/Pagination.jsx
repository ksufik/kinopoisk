import React from 'react';
import PropTypes from 'prop-types';

// из-за PureComponent (=shouldComponentUpdate) лишние рендеры компонента при взаимодействии с другими частями фильтра не происходят
export default class Pagination extends React.PureComponent {
  static propTypes = {
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number.isRequired,
  };

  //! ? Глюк при множественном нажатии на любую из кнопок
  nextPage = () => {
    this.props.onChangePage({
      page: this.props.page + 1,
      total_pages: this.props.total_pages,
    });
  };

  prevPage = () => {
    this.props.onChangePage({
      page: this.props.page - 1,
      total_pages: this.props.total_pages,
    });
  };

  render() {
    const { page, total_pages } = this.props;
    console.log('Pagination render');
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
