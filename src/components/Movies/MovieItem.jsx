import React from 'react';
import { Link } from 'react-router-dom';
import CallApi from '../api';
import { withAuth } from '../HOC/withAuth';
// '../../img/600x400.jpg'

class MovieItem extends React.Component {
  favoriteFunc = () => {
    if (this.props.session_id) {
      CallApi.post('account/{account_id}/favorite', {
        params: {
          session_id: this.props.session_id,
        },
        body: {
          media_type: 'movie',
          media_id: this.props.item.id,
          favorite: !this.props.favorited,
        },
      }).then((data) => {
        console.log('favorite', data);
        //! сделать так, чтобы при добавлении/удалении favorite movie весь массив не добавлялся в существующий
        this.props.emptyFavoriteAll();
        this.props.getFavorites();
      });
    }
  };

  render() {
    const { item, favorited } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;
    //   console.log('MovieItem render');

    return (
      <React.Fragment>
        <div
          className="card card-link btn-outline-info"
          style={{ width: '100%' }}
        >
          <Link to={`/movie/${item.id}`}>
            <img
              className="card-img-top card-img__height"
              src={
                imagePath
                  ? `https://image.tmdb.org/t/p/w500${imagePath}`
                  : 'https://dummyimage.com/600x400/1a1a1c/ffffff.jpg&text=%D0%9D%D0%95%D0%A2+%D0%9F%D0%9E%D0%A1%D0%A2%D0%95%D0%A0%D0%90'
              }
              alt="movie poster"
            />
          </Link>
          <div className="card-body">
            <h6 className="card-title">{item.title}</h6>
            <div className="card-bottom d-flex justify-content-between">
              <div className="card-text">Рейтинг: {item.vote_average}</div>
              <span
                className="material-icons"
                style={{ cursor: 'pointer', zIndex: 2 }}
                onClick={this.favoriteFunc}
                title="Избранное"
              >
                {favorited ? 'star' : 'star_border'}
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
// делалось для получения session_id
export default withAuth(MovieItem);
