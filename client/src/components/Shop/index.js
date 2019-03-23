import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars, faTh } from '@fortawesome/fontawesome-free-solid';
import PageTop from '../../utils/PageTop';
import CollapseCheckbox from '../../utils/CollapseCheckbox';
import CollapseRadio from '../../utils/CollapseRadio';
import SortBy from '../../utils/SortBy';
import LoadMoreCards from './LoadMoreCards';
import { getBooksToShop, getCategories } from '../../actions/books_actions';
import { price } from '../../utils/filters';

class Shop extends Component {
  state = {
    grid: null,
    limit: 6,
    skip: 0,
    filters: {
      category: [],
      price: []
    },
    sortBy: {
      value: 'createdAt',
      order: 'asc',
      items: [
        {
          name: 'Newest',
          value: 'createdAt',
          order: 'asc'
        },
        {
          name: 'Most Sold',
          value: 'sold',
          order: 'desc'
        }
      ]
    }
  };

  componentDidMount() {
    this.props.dispatch(getCategories());
    this.props.dispatch(
      getBooksToShop(
        this.state.skip,
        this.state.limit,
        this.state.filters,
        this.state.sortBy.value,
        this.state.sortBy.order
      )
    );
  }

  priceHandler = value => {
    let array = [];

    for (let key in price) {
      if (price[key]._id === parseInt(value)) array = price[key].array;
    }

    return array;
  };

  filtersHandler = (filters, filterName) => {
    const newFilters = { ...this.state.filters };
    newFilters[filterName] = filters;

    if (filterName === 'price') {
      const priceLimits = this.priceHandler(filters);

      newFilters[filterName] = priceLimits;
    }

    this.filteredResultsHandler(newFilters);

    this.setState({ filters: newFilters });
  };

  filteredResultsHandler = filters => {
    this.props.dispatch(getBooksToShop(0, this.state.limit, filters)).then(() => this.setState({ skip: 0 }));
  };

  loadMoreHandler = () => {
    const skip = this.state.skip + this.state.limit;

    this.props
      .dispatch(getBooksToShop(skip, this.state.limit, this.state.filters, '', '', this.props.books.books))
      .then(() => {
        this.setState({ skip });
      });
  };

  gridHandler = () => {
    this.setState({ grid: !this.state.grid ? 'grid_bars' : '' });
  };

  sortByHandler = value => {
    const sortBy = { ...this.state.sortBy };
    if (value === 'createdAt') sortBy.order = 'asc';
    else if (value === 'sold') sortBy.order = 'desc';

    sortBy.value = value;

    this.setState({ sortBy }, () => {
      this.props.dispatch(
        getBooksToShop(
          this.state.skip,
          this.state.limit,
          this.state.filters,
          this.state.sortBy.value,
          this.state.sortBy.order
        )
      );
    });
  };

  render() {
    return (
      <div>
        <PageTop backLink='/'>Browse Books</PageTop>
        <div className='container'>
          <div className='shop_wrapper'>
            <div className='left'>
              <SortBy items={this.state.sortBy.items} value={this.state.sortBy.value} changed={this.sortByHandler} />
              <CollapseCheckbox
                opened={false}
                title='Category'
                items={this.props.books.categories}
                filtersHandler={filters => this.filtersHandler(filters, 'category')}
              />
              <CollapseRadio
                opened={true}
                title='Price'
                items={price}
                filtersHandler={filters => this.filtersHandler(filters, 'price')}
              />
            </div>
            <div className='right'>
              <div className='shop_options'>
                <div className='shop_grids clear'>
                  <div className={`grid_btn ${this.state.grid ? '' : 'active'}`} onClick={this.gridHandler}>
                    <FontAwesomeIcon icon={faTh} style={{ cursor: 'pointer' }} />
                  </div>
                  <div className={`grid_btn ${!this.state.grid ? '' : 'active'}`} onClick={this.gridHandler}>
                    <FontAwesomeIcon icon={faBars} style={{ cursor: 'pointer' }} />
                  </div>
                </div>
              </div>
              <div>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={this.props.books.size}
                  books={this.props.books.books}
                  loadMore={() => this.loadMoreHandler()}
                />
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps)(Shop);
