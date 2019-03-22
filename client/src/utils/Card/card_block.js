import React from 'react';
import Card from './';

const CardBlock = props => {
  const renderCards = books => (books ? books.map((book, index) => <Card key={index} {...book} />) : null);

  return (
    <div className='card_block'>
      <div className='container'>
        {props.title ? <div className='title'>{props.title}</div> : null}
        {props.books ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridGap: '20px' }}>
            {renderCards(props.books)}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardBlock;
