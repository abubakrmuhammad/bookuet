import React from 'react';
import moment from 'moment';
import UserLayout from '../../hoc/UserLayout';
import Button from '../../utils/Button';

const UserDashboard = props => {
  const { firstname, lastname, email } = props.user.userData;

  const renderHistory = history => {
    if (history)
      return (
        <div className='user_nfo_panel'>
          <h1>History of Purchases</h1>
          <div className='user_product_block_wrapper'>
            <div className='history_block'>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Book Title</th>
                    <th>Quantity</th>
                    <th>Price Paid</th>
                    <th>Time of Purchase</th>
                  </tr>
                  {history.map(item => (
                    <tr key={item.id}>
                      <td>{item.porder}</td>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>$ {(item.quantity * item.price).toFixed(2)}</td>
                      <td>
                        {moment(item.dateOfPurchase).format('LL')}&nbsp;-&nbsp;
                        {moment(item.dateOfPurchase).format('LT')}
                      </td>
                    </tr>
                  ))}
                </thead>
              </table>
            </div>
          </div>
        </div>
      );
  };

  return (
    <UserLayout>
      <div>
        <div className='user_nfo_panel'>
          <h1>User Information</h1>
          <div>
            <span>{firstname}</span>
            <span>{lastname}</span>
            <span>{email}</span>
          </div>
          <Button type='default' linkTo='/user/profile'>
            Edit Account Info
          </Button>
        </div>
        {renderHistory(props.user.userData.history)}
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
