import React, { PureComponent } from 'react';

export default class ScrollToTop extends PureComponent {
  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  render() {
    return (
      <React.Fragment>
        <button
          className={`btn-up material-icons btn btn-warning ${
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
