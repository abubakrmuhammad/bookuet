import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCompass, faPhone, faClock, faEnvelope } from '@fortawesome/fontawesome-free-solid';

const Footer = props => {
  return (
    <footer className='bck_b_dark'>
      <div className='container'>
        <div className='logo'>Bookuet</div>
        <div className='wrapper'>
          <div className='left'>
            <h2>Contact Information</h2>
            {props.siteInfo ? (
              <div className='business_nfo'>
                <div className='tag'>
                  <FontAwesomeIcon icon={faCompass} className='icon' />
                  <div className='nfo'>
                    <div>Address</div>
                    <div>{props.siteInfo.address}</div>
                  </div>
                </div>
                <div className='tag'>
                  <FontAwesomeIcon icon={faPhone} className='icon' />
                  <div className='nfo'>
                    <div>Phone</div>
                    <div>{props.siteInfo.phone}</div>
                  </div>
                </div>
                <div className='tag'>
                  <FontAwesomeIcon icon={faClock} className='icon' />
                  <div className='nfo'>
                    <div>Working Hours</div>
                    <div>{props.siteInfo.hours}</div>
                  </div>
                </div>
                <div className='tag'>
                  <FontAwesomeIcon icon={faEnvelope} className='icon' />
                  <div className='nfo'>
                    <div>Email</div>
                    <div>{props.siteInfo.email}</div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className='right'>
            <h2>Be the first to know</h2>
            <div>
              <div>Get all the latest information on events, sales and offers. You can miss out.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
