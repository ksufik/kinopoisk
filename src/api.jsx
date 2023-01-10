import queryString from 'query-string';
import { LANGUAGE_RU } from './helpers/constants';

export const API_URL = 'https://api.themoviedb.org/3';
//API -> https://developers.themoviedb.org/3

export const API_KEY_3 = '3d236f637583a55776198933a4957be2';

export const API_KEY_4 =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDIzNmY2Mzc1ODNhNTU3NzYxOTg5MzNhNDk1N2JlMiIsInN1YiI6IjYzODNiZGNmZmI4MzQ2MDA4NzcwMDI2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.smhLrkRCamwDS5EJ-HBPbEoYqobADg7GSQSVH0WCOFM';

export const fetchApi = (url, options = {}) => {
  //! пример Promise => fetch => then
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((response) => {
        //превращаем ошибку объект и передаем дальше в конечный catch
        response.json().then((error) => {
          reject(error);
        });
      });
  });
};

export default class CallApi {
  static get(url, options = {}) {
    const { params = {} } = options;
    const queryParams = {
      api_key: API_KEY_3,
      language: LANGUAGE_RU,
      ...params,
    };

    return fetchApi(`${API_URL}/${url}?${queryString.stringify(queryParams)}`);
  }

  static post(url, options = {}) {
    const { params = {}, body = {} } = options;

    const queryParams = {
      api_key: API_KEY_3,
      language: LANGUAGE_RU,
      ...params,
    };

    return fetchApi(`${API_URL}/${url}?${queryString.stringify(queryParams)}`, {
      //! ПОЧИТАТЬ ПРО OPTIONS В FECTH И PROMISE
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }

  static delete(url, options = {}) {
    const { params = {}, body = {} } = options;

    const queryParams = {
      api_key: API_KEY_3,
      ...params,
    };

    return fetchApi(`${API_URL}/${url}?${queryString.stringify(queryParams)}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  }
}
