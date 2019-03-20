import React from 'react';
import Button from '../../utils/Button';
import Login from './Login';

const RegisterLogin = () => {
  return (
    <div className='page_wrapper'>
      <div className='container'>
        <div className='register_login_container'>
          <div className='left'>
            <h1>New Customers</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, voluptatem corrupti? Maiores ipsa dicta
              harum vel eaque soluta, totam eius quos nulla consequatur eligendi eveniet nam, error vero. Pariatur,
              asperiores.
            </p>
            <Button
              type='default'
              linkTo='/register'
              styling={{
                margin: '10px 0 0 0'
              }}>
              Create an Account
            </Button>
          </div>
          <div className='right'>
            <h2>Registered Customers</h2>
            <p>If you have an account, please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
