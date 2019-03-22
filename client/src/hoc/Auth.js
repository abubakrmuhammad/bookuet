import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';
import { CircularProgress } from '@material-ui/core';

export default function(ComposedClass, reload, adminRoute = null) {
  class Auth extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      window.scrollTo(0, 0);
      this.props.dispatch(auth()).then(response => {
        let user = this.props.user.userData;

        if (!user.isAuth) {
          if (reload) this.props.history.replace('/register_login');
        } else {
          if (adminRoute && !user.isAdmin) this.props.history.replace('/user/dashboard');
          else if (reload === false) this.props.history.replace('/user/dashboard');
        }

        this.setState({ loading: false });
      });
    }

    render() {
      if (this.state.loading)
        return (
          <div className='main_loader'>
            <CircularProgress style={{ color: '#2196f3' }} thickness={7} />
          </div>
        );
      else return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

  return connect(mapStateToProps)(Auth);
}
