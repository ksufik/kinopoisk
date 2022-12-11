import React, { PureComponent } from 'react';
import LoginContainer from './Login/LoginContainer';
import User from './User/User';

export default class Header extends PureComponent {
  handleGetFavorites = () => {
    this.props.onGetFavorites(false);
  };
  render() {
    console.log('Header render');
    const { user } = this.props;
    // если user = null, вылезает ошибка
    const headerUser = user && Object.keys(user).length > 0 ? user : null;

    return (
      <nav className="navbar navbar-dark bg-info">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a
                href="#"
                className="nav-link"
                onClick={this.handleGetFavorites}
              >
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
