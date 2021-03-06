import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/fontawesome-free-solid';
import Card from '../../utils/Card';

const CardBlock = props => {
  const renderCards = items => {
    if (items) return items.map(item => <Card key={item._id} {...item} grid={props.grid} />);
  };

  return (
    <div className='card_block_shop'>
      <div>
        <div className={props.grid ? '' : 'shop_grid'}>
          {props.books ? (
            props.books.length === 0 ? (
              <div className='no_result'>
                <FontAwesomeIcon icon={faFrown} />
                Sorry, No Books Found
              </div>
            ) : null
          ) : null}
          {renderCards(props.books)}
        </div>
      </div>
    </div>
  );
};

export default CardBlock;
