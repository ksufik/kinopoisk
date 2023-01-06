import { cookies } from '../../../helpers/utils';
import { COOKIES_AUTH } from '../../../helpers/constants';
import {
  LOG_OUT,
  UPDATE_AUTH,
  UPDATE_ERROR,
  UPDATE_SUBMITTING,
  FAVORITES_CLICKED,
} from './user.actions';

const initialState = {
  user: null,
  session_id: cookies.get(COOKIES_AUTH),
  isAuth: false,
  submitting: false,
  error: null,
  loading: false,
  getFavoritesIsClicked: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_AUTH:
      return {
        //иммутабельность
        ...state,
        user: payload.user,
        session_id: payload.session_id,
        isAuth: true,
      };
    case LOG_OUT:
      return {
        //иммутабельность
        ...state,
        user: null,
        session_id: null,
        isAuth: false,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    case UPDATE_SUBMITTING:
      return {
        ...state,
        submitting: payload.submitting,
      };
    case FAVORITES_CLICKED:
      return {
        ...state,
        getFavoritesIsClicked: payload.clicked,
      };
    default:
      return state;
  }
};
