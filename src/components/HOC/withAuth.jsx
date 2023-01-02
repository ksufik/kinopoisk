import React from 'react';
import * as authActions from '../store/user/user.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//selector
const mapStateToProps = (state, ownProps) => {
  //возвращаем из стора то, что нам нужно в этом компоненте (возвращается в качестве пропсов)
  return { auth: state.user };
};
// происходит автоматический диспатч
const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(authActions, dispatch),
});

////а вот что происходит поод капотом
//   return {
//     updateAuth: (user, session_id) =>
//       dispatch(updateAuth(user, session_id)),
//     onLogOut: () => dispatch(logOut()),
//   };

export const withAuth = (Component) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class withAuth extends React.Component {
      render() {
        return <Component {...this.props} />;
      }
    }
  );
