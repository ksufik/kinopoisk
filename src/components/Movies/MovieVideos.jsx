import React, { PureComponent } from 'react';
import CallApi from '../api';

export default class MovieVideos extends PureComponent {
  state = {
    videos: [],
  };

  componentDidMount() {
    CallApi.get(`movie/${this.props.movie_id}/videos`).then((data) => {
      this.setState({
        videos: data.results,
      });
    });
  }

  render() {
    const { videos } = this.state;
    return (
      <div className="d-flex flex-wrap mt-5 justify-content-center">
        {videos.map((video) => (
          <iframe
            key={video.key}
            style={{ height: '50vmin', width: '80vmin' }}
            type="text/html"
            src={`https://www.youtube.com/embed/${video.key}`}
            allowFullScreen="1"
            frameBorder="0"
            title={video.type}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        ))}
      </div>
    );
  }
}
