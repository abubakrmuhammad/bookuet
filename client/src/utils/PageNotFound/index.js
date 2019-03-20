import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/fontawesome-free-solid';
import Button from '../Button';

const PageNotFound = () => {
  return (
    <div className='container'>
      <div className='not_found_container'>
        <FontAwesomeIcon icon={faExclamationCircle} style={{ fontSize: '128px' }} />
        <div>Oops !! Page not found</div>
        <Button type='default' linkTo='/' styling={{ fontSize: '18px', color: '#fff', margin: '32px auto' }}>
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
