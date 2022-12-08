import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoginContainer from './Login/LoginContainer';
import User from './User';

export default class Header extends PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    console.log('Header render');
    const { user } = this.props;
    const headerUser = Object.keys(user).length > 0 ? user : null;

    return (
      <nav className="navbar navbar-dark bg-info">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a href="#" className="nav-link">
                Home
              </a>
            </li>
          </ul>
          {headerUser ? <User /> : <LoginContainer />}
        </div>
      </nav>
    );
  }
}
