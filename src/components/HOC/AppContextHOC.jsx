import React from 'react';
import { AppContext } from '../App';

export default (Component) =>
  class AppContextHOC extends React.Component {
    render() {
      console.log('AppContextHOC render');
      return (
        <AppContext.Consumer>
          {/* обрати внимание, что сначала идут пропсы, а потом контекст. Таким образом мы можем одинаковые переменные затереть, т.к. контекст в приоритете. Ведь для этого мы его и создали */}
          {(context) => <Component {...this.props} {...context} />}
        </AppContext.Consumer>
      );
    }
  };
