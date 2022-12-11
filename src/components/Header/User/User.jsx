import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppContextHOC from '../../HOC/AppContextHOC';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import CallApi from '../../api';

//! регистрация/авторизация
class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  state = { dropdownOpen: false };

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };

  handleLogOut = () => {
    CallApi.delete('authentication/session', {
      body: {
        session_id: this.props.session_id,
      },
    }).then(this.props.onLogOut());
  };

  handleGetFavoritesMovies = () => {
    this.props.onGetFavorites(true);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="user-wrapper">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle
            tag="div"
            onClick={this.toggle}
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <img
              width="40"
              className="rounded-circle"
              src={
                user.avatar.tmdb.avatar_path
                  ? `https://www.themoviedb.org/t/p/w150_and_h150_face/${user.avatar.tmdb.avatar_path}`
                  : `https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`
              }
              alt="avatar"
              onClick={this.toggle}
            />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem onClick={this.handleGetFavoritesMovies}>
              Любимые фильмы
            </DropdownItem>
            <DropdownItem onClick={this.handleLogOut}>Выйти</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

//переделали на НОС с контекстом
export default AppContextHOC(User);

// пример с контекстом
// //получается, что UserContext - это глупый (dummy, презентационный) компонент, в котором находится компонент User. И туда же нам надо передать все пропсы, т.е. пробросить на 1 уровень глубже
// const UserContext = (props) => {
//   return (
//     <AppContext.Consumer>
//       {(context) => <User user={context.user} {...props} />}
//     </AppContext.Consumer>
//   );
// };

//export default UserContext;
