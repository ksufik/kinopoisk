import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { withMovies } from '../HOC/withMovies';
import LoginContainer from './Login/LoginContainer';
import Search from './Search/Search';
import User from './User/User';

class Header extends PureComponent {
  handleGetHome = () => {
    this.props.favoritesIsClicked(false);
    this.props.moviesActions.resetFilters();
    this.props.moviesActions.updatePage(1);
		this.props.moviesActions.updateSearch('');
  };

  render() {
    const { user, moviesActions, moviesObj } = this.props;
    // если user = null, вылезает ошибка
    const headerUser = user && Object.keys(user).length > 0 ? user : null;

    return (
      <nav className="navbar navbar-dark bg-info p-3">
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
          <Search moviesActions={moviesActions} moviesObj={moviesObj} />
          {headerUser ? <User updateSearch={moviesActions.updateSearch} /> : <LoginContainer />}
        </div>
      </nav>
    );
  }
}

export default withMovies(Header);
