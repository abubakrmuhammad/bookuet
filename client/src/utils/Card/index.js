import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from '@material-ui/core';
import Button from '../Button';
import { addToCart } from '../../actions/user_actions';

class Card extends Component {
  state = {
    addBtnClass: ''
  };

  componentDidMount() {
    if (this.props.user.userData) {
      if (!this.props.user.userData.isAuth) this.setState({ addBtnClass: 'disabled' });
      else this.setState({ addBtnClass: '' });
    }
  }

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
    return 'Add to Cart';
  };

  render() {
    return (
      <div className={`card_item_wrapper ${this.props.grid}`}>
        <div className='image'>
          <img src={`${this.renderImage(this.props.images)}`} alt='Card Pic' />
        </div>
        <div className='action_container'>
          <div className='tags'>
            {this.props.grid ? (
              <div>
                <div className='name'>{this.props.title}</div>
                <div className='by'>By</div>
                <div className='brand'>{this.props.author ? this.props.author : 'Author'}</div>
              </div>
            ) : (
              <div>
                <div className='brand'>{this.props.author ? this.props.author : 'Author'}</div>
                <div className='name'>{this.props.title}</div>
              </div>
            )}

            <div className='price'>${this.props.price}</div>
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
              <div className={`button_wrapp ${this.state.addBtnClass}`}>
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
