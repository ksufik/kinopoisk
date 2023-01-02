import React, { Component } from 'react';
import PropTypes from 'prop-types';

//! СДЕЛАТЬ ИЗ ЭТОГО ПРЕЗЕНТАЦИОНННЫЙ КОМПОНЕНТ. ПОКА НЕ ИСПОЛЬЗУЕТСЯ

export default class LoginForm extends Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    updateSessionId: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    password: '',
    repeat_password: '',
    errors: {},
    submitting: false,
  };

  render() {
    const { username, password, repeat_password, errors, submitting } =
      this.state;

    return (
      <div className="form-login-container">
        <form className="form-login" onSubmit={this.onLogin}>
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <div className="form-group">
            <label htmlFor="username">Пользователь</label>
            <input
              type="text"
              className={this.getClassForInput('username')}
              id="username"
              placeholder="Пользователь"
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.onBlur}
              autoComplete="off"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              className={this.getClassForInput('password')}
              id="password"
              placeholder="Пароль"
              name="password"
              value={password}
              onChange={this.onChange}
              onBlur={this.onBlur}
              autoComplete="off"
              // pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}"
              title="Пароль должен содержать от 6 до 20 символов, в нем можно использовать цифры, символы и буквы латинского алфавита. При этом обязательно в пароле должна быть хотя бы одна цифра, одна буква в нижнем регистре и одна буква в верхнем регистре."
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="repeat">Повторите пароль</label>
            <input
              type="password"
              className={this.getClassForInput('repeat_password')}
              id="repeat"
              placeholder="Пароль"
              name="repeat_password"
              value={repeat_password}
              onChange={this.onChange}
              onBlur={this.onBlur}
              autoComplete="off"
            />
            {errors.repeat_password && (
              <div className="invalid-feedback">{errors.repeat_password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-info btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}
