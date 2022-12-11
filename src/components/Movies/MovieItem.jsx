import React from 'react';
import CallApi from '../api';
import AppContextHOC from '../HOC/AppContextHOC';
// '../../img/600x400.jpg'

class MovieItem extends React.Component {
  state = {
    favorite: false,
  };

  favoriteToggle = () => {
    this.setState(
      (prevState) => ({
        favorite: !prevState.favorite,
      }),
      () => this.favoriteFunc()
    );
  };

  favoriteFunc = () => {
    CallApi.post('account/{account_id}/favorite', {
      params: {
        session_id: this.props.session_id,
      },
      body: {
        media_type: 'movie',
        media_id: this.props.item.id,
        favorite: this.state.favorite,
      },
    }).then((data) => {
      console.log('favorite', data);
    });
  };

  render() {
    const { item, favorited } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;
    console.log('MovieItem render');

    return (
      <div className="card btn-outline-info" style={{ width: '100%' }}>
        {/* {console.log(item)} */}
        <img
          className="card-img-top card-img__height"
          src={
            imagePath
              ? `https://image.tmdb.org/t/p/w500${imagePath}`
              : 'https://dummyimage.com/600x400/1a1a1c/ffffff.jpg&text=%D0%9D%D0%95%D0%A2+%D0%9F%D0%9E%D0%A1%D0%A2%D0%95%D0%A0%D0%90'
          }
          alt=""
        />
        <div className="card-body ">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-bottom d-flex justify-content-between">
            <div className="card-text ">Рейтинг: {item.vote_average}</div>
            <span className="material-icons" onClick={this.favoriteToggle}>
              {favorited ? 'star' : 'star_border'}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MovieItem);
