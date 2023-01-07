import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ScrollToTop extends Component {
  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  render() {
    return (
      <React.Fragment>
        <button
          className={`btn-up material-icons btn btn-outline-info ${
            this.props.isVisible ? '' : 'btn-up_hiding'
          }`}
          onClick={this.scrollToTop}
        >
          upload
        </button>
      </React.Fragment>
    );
  }
}
