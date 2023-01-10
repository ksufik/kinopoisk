import React, { PureComponent } from 'react';
import CallApi from '../../api';
import { withParams } from '../HOC/withParams';
import MovieCredits from '../Movies/MovieCredits';
import MovieVideos from '../Movies/MovieVideos';

class MoviePage extends PureComponent {
  state = {
    movie: null,
  };

  componentDidMount() {
    CallApi.get(`movie/${this.props.params.movie_id}`).then((data) => {
      this.setState({
        movie: data,
      });
    });
  }

  render() {
    const { movie } = this.state;
    const imagePath = movie ? movie.backdrop_path || movie.poster_path : null;
    return (
      <React.Fragment>
        {movie && (
          <div className="p-5">
            <div className="d-flex align-items-start">
              <img
                style={{ objectFit: 'contain' }}
                className="card-img-top w-75 flex-fill"
                src={
                  imagePath
                    ? `https://image.tmdb.org/t/p/w500${imagePath}`
                    : 'https://dummyimage.com/600x400/1a1a1c/ffffff.jpg&text=%D0%9D%D0%95%D0%A2+%D0%9F%D0%9E%D0%A1%D0%A2%D0%95%D0%A0%D0%90'
                }
                alt="movie poster"
              />
              <div className="card-body flex-fill card-text">
                <h4 className="card-title text-center">{movie.title}</h4>
                <h6 className="card-subtitle text-center">{movie.tagline}</h6>
                <p className="card-text m-3" style={{ textAlign: 'justify' }}>
                  {movie.overview}
                </p>
              </div>
            </div>
            <MovieVideos movie_id={movie.id} />
            <MovieCredits movie_id={movie.id} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withParams(MoviePage);
