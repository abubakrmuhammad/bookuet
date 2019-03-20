import React from 'react';
import { Link } from 'react-router-dom';

const Items = props => {
  const renderItemImage = images => {
    if (images.length > 0) return images[0].url;
    return '/images/image_not_available.png';
  };

  const renderItems = () => {
    if (props.cart)
      return props.cart.map(item => (
        <div className='user_product_block' key={item._id}>
          <div className='item'>
            <div className='image' style={{ background: `url(${renderItemImage(item.images)}) no-repeat` }} />
          </div>
          <div className='item'>
            <h4>Book Title</h4>
            <div className='cart_item_title_link'>
              <Link to={`/books/${item._id}`}>{item.title}</Link>
            </div>
          </div>
          <div className='item'>
            <h4>Quantity</h4>
            <div>{item.quantity}</div>
          </div>
          <div className='item'>
            <h4>Price</h4>
            <div>$ {item.price}</div>
          </div>
          <div className='item btn'>
            <div className='cart_remove_btn' onClick={() => props.removeItem(item._id)}>
              Remove
            </div>
          </div>
        </div>
      ));
  };

  return <div>{renderItems()}</div>;
};

export default Items;
