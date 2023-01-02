import React, { PureComponent } from 'react';
import CallApi from '../api';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

export default class MovieCredits extends PureComponent {
  state = {
    crew: [],
    cast: [],
    activeIndex: 0,
    animating: false,
  };

  componentDidMount() {
    CallApi.get(`movie/${this.props.movie_id}/credits`).then((data) => {
      this.setState({
        crew: data.crew,
        cast: data.cast,
      });
    });
  }

  next = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.cast.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({
      activeIndex: nextIndex,
    });
  };

  previous = () => {
    if (this.state.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.cast.length - 1
        : this.state.activeIndex - 1;
    this.setState({
      activeIndex: nextIndex,
    });
  };

  goToIndex = (newIndex) => {
    if (this.state.animating) return;
    this.setState({
      activeIndex: newIndex,
    });
  };

  render() {
    const { cast, activeIndex } = this.state;

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        className="mt-2 w-75 mx-auto"
      >
        <CarouselIndicators
          items={cast}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {cast.map((actor) => {
          return (
            <CarouselItem
              onExiting={() =>
                this.setState({
                  animating: true,
                })
              }
              onExited={() =>
                this.setState({
                  animating: false,
                })
              }
              key={actor.order}
            >
              <img
                style={{ height: '60vmin' }}
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : 'https://dummyimage.com/600x400/1a1a1c/ffffff.jpg&text=%D0%9D%D0%95%D0%A2+%D0%9F%D0%9E%D0%A1%D0%A2%D0%95%D0%A0%D0%90'
                }
                alt={actor.name}
              />
              <CarouselCaption
                captionText={actor.character}
                captionHeader={actor.name}
              />
            </CarouselItem>
          );
        })}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }
}
