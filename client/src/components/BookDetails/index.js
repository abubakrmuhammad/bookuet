import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import PageTop from '../../utils/PageTop';
import { getBookDetails, clearBookDetails } from '../../actions/books_actions';
import { addToCart } from '../../actions/user_actions';
import Info from './Info';
import Images from './Images';

class BookDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.dispatch(getBookDetails(id));
  }

  componentDidUpdate() {
    if (this.props.books.book) if (this.props.books.book.config) this.props.history.replace('/books');
  }

  componentWillUnmount() {
    this.props.dispatch(clearBookDetails());
  }

  addToCartHandler(id) {
    this.props.dispatch(addToCart(id));
  }

  render() {
    return (
      <div>
        <PageTop backLink='/books'>Book Details</PageTop>
        <div className='container'>
          {this.props.books.book ? (
            <div className='product_detail_wrapper'>
              <div className='left'>
                <div style={{ width: '500px' }}>
                  <Images details={this.props.books.book} />
                </div>
              </div>
              <div className='right'>
                <Info
                  details={this.props.books.book}
                  user={this.props.user.userData}
                  addToCart={id => this.addToCartHandler(id)}
                />
              </div>
            </div>
          ) : (
            <CircularProgress style={{ color: '#2196f3' }} thickness={7} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(BookDetails);
