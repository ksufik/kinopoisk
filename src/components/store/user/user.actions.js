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
