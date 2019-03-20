import React from 'react';
import CardBlock from './CardBlock';

const LoadMoreCards = props => {
  return (
    <div>
      <div>
        <CardBlock books={props.books} grid={props.grid} />
      </div>
      {props.size > 0 && props.size >= props.limit ? (
        <div className='load_more_container'>
          <span onClick={() => props.loadMore()}>Load More</span>
        </div>
      ) : null}
    </div>
  );
};

export default LoadMoreCards;
