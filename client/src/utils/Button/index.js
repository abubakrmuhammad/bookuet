import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/fontawesome-free-solid';

const Button = props => {
  const render = () => {
    let template = null;

    switch (props.type) {
      case 'default':
        template = (
          <Link
            className={!props.altClass ? 'link_default' : props.altClass}
            to={props.linkTo}
            style={{ ...props.styling }}>
            {props.children}
          </Link>
        );
        break;
      case 'bag_link':
        template = (
          <div className='bag_link' style={{ ...props.styling }} onClick={() => props.runAction()}>
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
        );
        break;
      case 'add_to_cart_link':
        template = (
          <div className='add_to_cart_link' onClick={props.clicked} style={{ ...props.styling }}>
            <FontAwesomeIcon icon={faShoppingBag} />
            Add To Cart
          </div>
        );
        break;
      default:
        template = null;
    }

    return template;
  };

  return <div className='my_link'>{render()}</div>;
};

export default Button;
