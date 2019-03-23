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
              We bring you the best possible expericience that you can ever get. Sign Up Now and Enjoy Unlimited
              Shopping forever. Click the button below to Create your account now.
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
