import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { Link } from 'react-router-dom';

const PageTop = props => {
  return (
    <div className='page_top'>
      <div className='container'>
        <Link to={props.backLink}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        {props.children}
      </div>
    </div>
  );
};

export default PageTop;
