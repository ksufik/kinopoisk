import CallApi from '../../api';

export const UPDATE_AUTH = 'USER::UPDATE_AUTH';
export const LOG_OUT = 'USER::LOG_OUT';
export const UPDATE_SUBMITTING = 'USER::UPDATE_SUBMITTING';
export const UPDATE_ERROR = 'USER::UPDATE_ERROR';

export const updateAuth = ({ user, session_id }) => ({
  type: UPDATE_AUTH,
  payload: {
    user,
    session_id,
  },
});

export const updateLogOut = () => ({
  type: LOG_OUT,
});

export const updateSubmitting = (submitting) => ({
  type: UPDATE_SUBMITTING,
  payload: { submitting },
});

export const updateError = (error) => ({
  type: UPDATE_ERROR,
  payload: { error },
});

export const getAccount = (session_id) => async (dispatch) => {
  //dispatch(animeLoading());

  if (session_id) {
    CallApi.get('account', { params: { session_id: session_id } })
      .then((user) => {
        dispatch(updateAuth({ user, session_id }));
        dispatch(updateSubmitting(false));
        // dispatch(animeSuccess(result.data));
      })
      .catch((error) => {
        //	dispatch(animeFailure());
        console.log('user error:', error);
      })
      .finally(() => {
        console.log('user finally');
        //dispatch(animeLoading());
      });
  }
};

export const logIn =
  ({ username, password }) =>
  async (dispatch) => {
    //dispatch(animeLoading());

    //заглушка от множественных кликов: пока идет запрос кнопка не работает
    dispatch(updateSubmitting(true));
    let session_id = null;

    CallApi.get('authentication/token/new')
      .then((token) => {
        return CallApi.post('authentication/token/validate_with_login', {
          body: {
            username,
            password,
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
        session_id = session.session_id;
        return dispatch(getAccount(session_id));
      })
      .then((user) => {
        dispatch(updateAuth({ user, session_id }));
      })
      .catch((error) => {
        dispatch(updateError(error.status_message));
      })
      .finally(() => {
        console.log('logIn finally');
        dispatch(updateSubmitting(true));
        //dispatch(animeLoading());
      });
  };

export const logOut = (session_id) => async (dispatch) => {
  //dispatch(animeLoading());

  CallApi.delete('authentication/session', {
    body: {
      session_id: session_id,
    },
  })
    .then(() => {
      dispatch(updateLogOut());
    })
    .catch((error) => {
      console.log('logOut error');
      dispatch(updateError(error.status_message));
    })
    .finally(() => {
      console.log('logOut finally');
      //dispatch(animeLoading());
    });
};
