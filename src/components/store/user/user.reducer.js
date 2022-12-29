import Cookies from 'universal-cookie';
import { COOKIES_NAME } from '../../../helpers/constants';
import { LOG_OUT, UPDATE_AUTH } from './user.actions';

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get(COOKIES_NAME),
  getFavoritesIsClicked: false,
  isAuth: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_AUTH:
      cookies.set(COOKIES_NAME, payload.session_id, {
        path: '/',
        // 30 дней в секундах
        maxAge: 3600 * 24 * 30,
      });
      return {
        //иммутабельность
        ...state,
        user: payload.user,
        session_id: payload.session_id,
        isAuth: true,
      };
    case LOG_OUT:
      cookies.remove(COOKIES_NAME);
      return {
        //иммутабельность
        ...state,
        user: null,
        session_id: null,
        isAuth: false,
      };
    default:
      return state;
  }
};
