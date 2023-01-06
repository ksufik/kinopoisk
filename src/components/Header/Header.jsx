import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withMovies } from '../HOC/withMovies';
import LoginContainer from './Login/LoginContainer';
import User from './User/User';

class Header extends PureComponent {
  handleGetHome = () => {
    this.props.favoritesIsClicked(false);
    this.props.moviesActions.resetFilters();
    this.props.moviesActions.updatePage(1);
  };

  render() {
    const { user } = this.props;
    // если user = null, вылезает ошибка
    const headerUser = user && Object.keys(user).length > 0 ? user : null;

    return (
      <nav className="navbar navbar-dark bg-info">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link
                to="/"
                className="nav-link"
                onClick={this.handleGetHome}
                title="Вернуться на главную"
              >
                Home
              </Link>
            </li>
          </ul>
          {headerUser ? <User /> : <LoginContainer />}
        </div>
      </nav>
    );
  }
}

export default withMovies(Header);
