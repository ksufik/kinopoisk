import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../../UI/Input';
import { withAuth } from '../../HOC/withAuth';

class LoginForm extends Component {
  // static propTypes = {
  //   updateAuth: PropTypes.func.isRequired,
  // };

  state = {
    username: 'xenia_kuz',
    password: '7dAgAe@wZA9EdkM',
    errors: {},
  };

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const { auth, authActions } = this.props;

    this.setState(
      () => ({
        [name]: value,
      }),
      () => {
        //чтобы диспатчился экшн updateError только если auth.error меняется с null на ошибку
        if (auth.error !== null) {
          authActions.updateError(null);
          //заглушка от множественных кликов
          this.props.authActions.updateSubmitting(false);
        }
      }
    );

    //чтобы срабатывало только при первом изменении в errors на null, т.е. 1 раз
    if (this.state.errors[name] !== null) {
      this.setState(
        (prevState) => ({
          errors: {
            ...prevState.errors,
            [name]: null,
          },
        }),
        () => {
          //чтобы только срабатывало, если нет ошибок в стейте (кнопка раздизейблится)
          if (!this.validateFields()) {
            //заглушка от множественных кликов
            this.props.authActions.updateSubmitting(false);
          }
        }
      );
    }
  };

  //возвращает true, если есть ошибки
  validateFields = () => {
    const { auth, authActions } = this.props;
    const errors = {};
    const regexp = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}');
    if (this.state.username === '') {
      errors.username = 'Введите логин';
    }

    if (this.state.password === '') {
      errors.password = 'Введите пароль';
    } else if (!regexp.test(this.state.password)) {
      errors.password =
        'Пароль должен содержать от 6 до 20 символов, в нем можно использовать цифры, символы и буквы латинского алфавита. При этом обязательно в пароле должна быть хотя бы одна цифра, одна буква в нижнем регистре и одна буква в верхнем регистре.';
    }

    //если есть ошибки
    if (Object.keys(errors).length > 0) {
         this.setState(
        (prevState) => ({
          errors: {
            ...prevState.errors,
            ...errors,
          },
        }),
        () => {
          //чтобы избедать повторного вызова, если в одном инпуте уже есть ошибка
          if (auth.submitting !== true) {
            authActions.updateSubmitting(true);
          }
        }
      );
      return true;
    } else return false;
  };

  onBlur = (event) => {
    this.validateFields();
  };

  onLogin = (e) => {
    e.preventDefault();
    if (!this.validateFields()) {
      this.onSubmit();
    }
  };

  onSubmit = async () => {
    const { authActions } = this.props;

    authActions.logIn({
      username: this.state.username,
      password: this.state.password,
    });
    authActions.updateError(null);
  };

  getClassForInput = (key) =>
    classNames('form-control', {
      input_invalid: this.state.errors[key],
    });

  render() {
    const { username, password, errors } = this.state;
    const {
      auth: { error, submitting },
    } = this.props;

    return (
      <div className="form-login-container">
        <form className="form-login" onSubmit={this.onLogin}>
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>

          <div className="form-group">
            <Input
              label="Пользователь"
              className={this.getClassForInput('username')}
              name="username"
              value={username}
              onChange={this.onChange}
              onBlur={this.onBlur}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <Input
              label="Пароль"
              type="password"
              className={this.getClassForInput('password')}
              name="password"
              value={password}
              onChange={this.onChange}
              onBlur={this.onBlur}
              title="Пароль должен содержать от 6 до 20 символов, в нем можно использовать цифры, символы и буквы латинского алфавита. При этом обязательно в пароле должна быть хотя бы одна цифра, одна буква в нижнем регистре и одна буква в верхнем регистре."
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
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
          {error && <div className="invalid-feedback text-center">{error}</div>}
        </form>
      </div>
    );
  }
}
export default withAuth(LoginForm);
