import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import Button from '../Button';
import { addToCart } from '../../actions/user_actions';

class Card extends Component {
  renderImage = images => {
    if (images.length > 0) return images[0].url;
    return '/images/image_not_available.png';
  };

  addToCartHandler = id => {
    if (this.props.user.userData.isAuth) this.props.dispatch(addToCart(id));
  };

  tooltipMessageHandler = () => {
    if (this.props.user.userData) {
      if (!this.props.user.userData.isAuth) return 'Please Login First!';
    }
    return '';
  };

  render() {
    return (
      <div className={`card_item_wrapper ${this.props.grid}`}>
        <div
          className='image'
          style={{
            background: `url(${this.renderImage(this.props.images)}) no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className='action_container'>
          <div className='tags'>
            <div className='brand'>{this.props.author ? this.props.author : 'Author'}</div>
            <div className='name'>{this.props.title}</div>
            <div className='name'>${this.props.price}</div>
          </div>
          {this.props.grid ? (
            <div className='description'>
              <p>{this.props.description}</p>
            </div>
          ) : null}
          <div className='actions'>
            <div className='button_wrapp'>
              <Button
                type='default'
                altClass='card_link'
                linkTo={`/books/${this.props._id}`}
                styling={{ margin: '10px 0 0 0' }}>
                View Book
              </Button>
            </div>
            <Tooltip title={this.tooltipMessageHandler()} placement='top'>
              <div className='button_wrapp'>
                <Button
                  type='bag_link'
                  runAction={() => this.addToCartHandler(this.props._id)}
                  styling={{ margin: '10px 0 0 0' }}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Card);
