import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/user_actions';

class Header extends Component {
  state = {
    page: [{ name: 'Home', linkTo: '/', public: true }, { name: 'Books', linkTo: '/books', public: true }],
    user: [
      { name: 'My Cart', linkTo: '/user/cart', public: false },
      { name: 'My Account', linkTo: '/user/dashboard', public: false },
      { name: 'Login', linkTo: '/register_login', public: true },
      { name: 'Logout', linkTo: '/user/logout', public: false }
    ]
  };

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(response => {
      if (response.payload.success) this.props.history.replace('/');
    });
  };

  defaultLink = (link, index) =>
    link.name === 'Logout' ? (
      <div className='log_out_link' key={index} onClick={() => this.logoutHandler()}>
        {link.name}
      </div>
    ) : (
      <Link to={link.linkTo} key={index}>
        {link.name}
      </Link>
    );

  cartLink = (link, index) => {
    const user = this.props.user.userData;

    return (
      <div className='cart_link' key={index}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={link.linkTo}>{link.name}</Link>
      </div>
    );
  };

  renderLinks = links => {
    const linksList = [];

    if (this.props.user.userData) {
      links.forEach(link => {
        if (!this.props.user.userData.isAuth) {
          if (link.public) linksList.push(link);
        } else if (link.name !== 'Login') {
          linksList.push(link);
        }
      });
    }

    return linksList.map((link, index) => {
      if (link.name !== 'My Cart') return this.defaultLink(link, index);
      else return this.cartLink(link, index);
    });
  };

  render() {
    return (
      <header className='bck_b_light'>
        <div className='container'>
          <div className='left'>
            <div className='logo'>Bookuet</div>
          </div>
          <div className='right'>
            <div className='top'>{this.renderLinks(this.state.user)}</div>
            <div className='bottom'>{this.renderLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(withRouter(Header));
