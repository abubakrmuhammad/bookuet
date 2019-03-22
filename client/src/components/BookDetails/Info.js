import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTruck, faCheck, faTimes } from '@fortawesome/fontawesome-free-solid';
import { Tooltip } from '@material-ui/core';
import Button from '../../utils/Button';

const Info = props => {
  let addBtnClass = '';

  if (!props.user.isAuth) addBtnClass = 'disabled';
  else addBtnClass = '';

  const tooltipMessageHandler = () => {
    if (props.user) {
      if (!props.user.isAuth) return 'Please Login First!';
    }
    return '';
  };

  return (
    <div>
      <h1>{props.details.title}</h1>
      <p>{props.details.description}</p>
      <div className='product_tags'>
        {props.details.shipping ? (
          <div className='tag'>
            <div>
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div className='tag_text'>
              <div>Free shipping</div>
              <div>And return</div>
            </div>
          </div>
        ) : null}
        {props.details.available ? (
          <div className='tag'>
            <div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className='tag_text'>
              <div>Available</div>
              <div>In Store</div>
            </div>
          </div>
        ) : (
          <div className='tag'>
            <div>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className='tag_text'>
              <div>Not Available</div>
              <div>Preorder only</div>
            </div>
          </div>
        )}
      </div>
      <div className='product_specifications'>
        <h2>More Info</h2>
        <div>
          <div className='item'>
            <strong>Author: &nbsp; </strong> {props.details.author}
          </div>
          <div className='item'>
            <strong>Copies Sold: &nbsp; </strong> {props.details.sold}
          </div>
        </div>
      </div>
      <div className='product_actions'>
        <div className='price'>$ {props.details.price}</div>
        <Tooltip title={tooltipMessageHandler()} placement='bottom'>
          <div className={`cart ${addBtnClass}`}>
            <Button
              type='add_to_cart_link'
              clicked={() => {
                props.addToCart(props.details._id);
              }}
              styling={{ marginTop: '10px' }}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Info;
