import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../../UI/Input';
import AppContextHOC from '../../HOC/AppContextHOC';
import CallApi from '../../api';

class LoginForm extends Component {
  static propTypes = {
    updateUser: PropTypes.func.isRequired,
    updateSessionId: PropTypes.func.isRequired,
  };

  state = {
    username: 'xenia_kuz',
    password: '7dAgAe@wZA9EdkM',
    repeat_password: '7dAgAe@wZA9EdkM',
    errors: {},
    submitting: false,
  };

  // статические объекты или массивы загоняем в defaultProps, чтобы при каждом рендере не создавалась новая ссылка на хардкод
  //! ПОЧИТАТЬ ПРО OPTIONS В FECTH И PROMISE
  static defaultProps = {
    options: {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
    },
  };

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState((prevState) => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: null,
        base: null,
      },
      submitting: false,
    }));
  };

  validateFields = () => {
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

    if (this.state.password !== this.state.repeat_password) {
      errors.repeat_password = 'Пароли не совпадают';
    }

    if (Object.keys(errors).length > 0) {
      //! ? зачем здесь (
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          ...errors,
        },
        submitting: true,
      }));
      return true;
    } else return false;
  };

  onBlur = (event) => {
    //? для будущей валидации отдельно каждого поля
    // console.log('event.target.name:', event.target.name);
    this.validateFields();
  };

  onLogin = (e) => {
    e.preventDefault();
    if (!this.validateFields()) {
      this.onSubmit();
    }
  };

  onSubmit = async () => {
    //заглушка от множественных кликов: пока идет запрос кнопка не работает
    this.setState((prevState) => ({ ...prevState, submitting: true }));

    CallApi.get('authentication/token/new')
      .then((token) => {
        return CallApi.post('authentication/token/validate_with_login', {
          body: {
            username: this.state.username,
            password: this.state.password,
            request_token: token.request_token,
          },
        });
      })
      .then((token) => {
        return CallApi.post('authentication/session/new', {
          body: {
            request_token: token.request_token,
          },
        });
      })
      .then((session) => {
        this.props.updateSessionId(session.session_id);
        // return fetchApi(
        //   `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session.session_id}`
        // );
        return CallApi.get(`account`, {
          params: { session_id: session.session_id },
        });
      })
      .then((user) => {
        //  если вызвать обновление пользователя коллбэком setState, то не возникнет ошибки, когда компонент уже размонтировался, а setState только вызывается
        this.setState(
          (prevState) => ({
            ...prevState,
            submitting: true,
          }),
          () => {
            this.props.updateUser(user);
          }
        );
      })
      .catch((error) => {
        this.setState((prevState) => ({
          ...prevState,
          errors: { base: error.status_message },
          submitting: true,
        }));
      });

    //! Другой вариант работы с запросами к API (axios)
    // const getFetchOptions = (bodyParams) => {
    //   this.props.options.body = JSON.stringify(bodyParams);
    //   return this.props.options;
    // };
    // можно сделать все через Promise => fetch => then (пример в fetchApi.js), но это будет трудно читать, поэтому мы делаем try catch (читабельность)
    // try {
    //   // получаем токен 1
    //   const getRequestToken = await fetchApi(
    //     `${API_URL}/authentication/token/new?api_key=${API_KEY_3}`
    //   );
    //   // проверяем права пользователя: отправляем логин, пароль и токен 1 и получаем опять токен 1 //? (так устроен api)
    //   const validateWithLogin = await fetchApi(
    //     `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
    //     // getFetchOptions({
    //     //   username: this.state.username,
    //     //   password: this.state.password,
    //     //   request_token: getRequestToken.request_token,
    //     // })
    //     {
    //       method: 'POST',
    //       mode: 'cors',
    //       headers: {
    //         'Content-type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         username: this.state.username,
    //         password: this.state.password,
    //         request_token: getRequestToken.request_token,
    //       }),
    //     }
    //   );
    //   // получаем session id
    //   const getSessionId = await fetchApi(
    //     `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
    //     getFetchOptions({
    //       // из validateWithLogin, чтобы соблюсти цепочку
    //       request_token: validateWithLogin.request_token,
    //     })
    //   );
    //   this.props.updateSessionId(getSessionId.session_id);
    //   const getUser = await fetchApi(
    //     `${API_URL}/account?api_key=${API_KEY_3}&session_id=${getSessionId.session_id}`
    //   );
    //   //  если вызвать обновление пользователя коллбэком setState, то не возникнет ошибки, когда компонент уже размонтировался, а setState только вызывается
    //   this.setState(
    //     (prevState) => ({
    //       ...prevState,
    //       submitting: true,
    //     }),
    //     () => {
    //       this.props.updateUser(getUser);
    //     }
    //   );
    // } catch (error) {
    //   this.setState((prevState) => ({
    //     ...prevState,
    //     errors: { base: error.status_message },
    //     submitting: true,
    //   }));
    // }
  };

  getClassForInput = (key) =>
    classNames('form-control', {
      input_invalid: this.state.errors[key],
    });

  render() {
    console.log('LoginForm render');

    const { username, password, repeat_password, errors, submitting } =
      this.state;

    return (
      <div className="form-login-container">
        <form className="form-login" onSubmit={this.onLogin}>
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          {/* <div className="form-group">
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
          </div> */}
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
          {/* <div className="form-group">
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
          </div> */}
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
          {/* <div className="form-group">
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
          </div> */}

          <div className="form-group">
            <Input
              label="Повторите пароль"
              placeholder="Пароль"
              type="password"
              className={this.getClassForInput('repeat_password')}
              name="repeat_password"
              value={repeat_password}
              onChange={this.onChange}
              onBlur={this.onBlur}
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

//переделали на НОС с контекстом
export default AppContextHOC(LoginForm);

// пример с контекстом
// //получается, что LoginFormContext - это глупый (dummy) компонент (презентационный), в к отором находится компонент LoginForm. И туда же нам надо передать все пропсы, т.е. пробросить на 1 компонент глубже
// const LoginFormContext = (props) => {
//   return (
//     <AppContext.Consumer>
//       {(context) => <LoginForm updateUser={context.updateUser} {...props} />}
//     </AppContext.Consumer>
//   );
// };

//export default LoginFormContext;
