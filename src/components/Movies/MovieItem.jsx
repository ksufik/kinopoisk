import React from 'react';
// '../../img/600x400.jpg'

export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;
    console.log('MovieItem render');
    return (
      <div className="card btn-outline-info" style={{ width: '100%' }}>
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
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}
