import React from 'react';
import AuthUserName from '../context';
import {withSignUp} from '../SignUp/context';

const withDisplayName = Component => {
  class withDisplayName extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          displayName: " "
      }
    }

    componentDidMount(){
        this.props.
    }
  }

  return withSignUp(withDisplayName);
};
