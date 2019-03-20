import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = {
  user: [
    { name: 'My Account', linkTo: '/user/dashboard' },
    { name: 'My Cart', linkTo: '/user/cart' },
    { name: 'Edit Profile', linkTo: '/user/profile' }
  ],
  admin: [
    { name: 'Edit Site Info', linkTo: '/admin/site_info' },
    { name: 'Add Books', linkTo: '/admin/add_book' },
    { name: 'Manage Categories', linkTo: '/admin/manage_categories' }
  ]
};

const UserLayout = props => {
  const renderLinks = links =>
    links.map((item, index) => (
      <Link to={item.linkTo} key={index}>
        {item.name}
      </Link>
    ));

  return (
    <div className='container'>
      <div className='user_container'>
        <div className='user_left_nav'>
          <h2>My Account</h2>
          <div className='links'>{renderLinks(links.user)}</div>
          {props.user.userData.isAdmin ? (
            <div>
              <h2>Admin</h2>
              <div className='links'>{renderLinks(links.admin)}</div>
            </div>
          ) : null}
        </div>

        <div className='user_right'>{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserLayout);
