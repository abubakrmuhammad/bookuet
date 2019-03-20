import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeSlider from './Slider';
import HomePromotion from './Promotion';
import CardBlock from '../../utils/Card/card_block';
import { getBooksByArrival, getBooksBySell } from '../../actions/books_actions';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(getBooksBySell());
    this.props.dispatch(getBooksByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock title='Best Selling Books' books={this.props.books.bySell} />
        <HomePromotion />
        <CardBlock title='Recently Published' books={this.props.books.byArrival} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(Home);
