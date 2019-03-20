import React from 'react';
import Button from '../../../utils/Button';

const HomePromotion = () => {
  const promotion = {
    img: '/images/featured/featured_home_3.jpg',
    title: 'Up to 40% off',
    subTitle: 'In second hand guitars',
    linkTitle: 'Shop now',
    linkTo: '/shop'
  };

  const renderPromotion = () => (
    <div className='home_promotion_img' style={{ background: `url(${promotion.img})` }}>
      <div className='tag title'>{promotion.title}</div>
      <div className='tag low_title'>{promotion.subTitle}</div>
      <div>
        <Button type='default' linkTo={promotion.linkTo} styling={{ marginTop: '16px' }}>
          {promotion.linkTitle}
        </Button>
      </div>
    </div>
  );

  return <div className='home_promotion'>{renderPromotion()}</div>;
};

export default HomePromotion;
