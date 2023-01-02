import CallApi from '../../api';

export const UPDATE_AUTH = 'USER::UPDATE_AUTH';
export const LOG_OUT = 'USER::LOG_OUT';

export const updateAuth = ({ user, session_id }) => ({
  type: UPDATE_AUTH,
  payload: {
    user,
    session_id,
  },
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const getAccount = (session_id) => async (dispatch) => {
  //dispatch(animeLoading());

  if (session_id) {
    CallApi.get('account', { params: { session_id: session_id } })
      .then((user) => {
        dispatch(updateAuth({ user, session_id }));
        // dispatch(animeSuccess(result.data));
      })
      .catch((error) => {
        //	dispatch(animeFailure());
        console.log('user error:', error);
      })
      .finally(() => {
        console.log('finally');
        //dispatch(animeLoading());
      });
  }
};
