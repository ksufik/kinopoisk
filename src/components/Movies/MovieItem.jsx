import React from 'react';
import { Link } from 'react-router-dom';
import { withMovies } from '../HOC/withMovies';

class MovieItem extends React.Component {
  //добавить/удалить из favorite
  favoriteFunc = () => {
    this.props.moviesActions.addDelFav({
      movie: this.props.item,
      favorited: this.props.favorited,
    });
  };

  render() {
    const { item, favorited, isAuth } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;

    return (
      <React.Fragment>
        <div className="card card-link btn-outline-info w-100">
          <Link to={`/movie/${item.id}`} target="_blank">
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
              {isAuth && (
                <span
                  className="text-warning material-icons"
                  style={{ cursor: 'pointer', zIndex: 2 }}
                  onClick={this.favoriteFunc}
                  title="Избранное"
                >
                  {favorited ? 'star' : 'star_border'}
                </span>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withMovies(MovieItem);
