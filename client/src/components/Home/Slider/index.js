import React from 'react';
import Slider from 'react-slick';
import Button from '../../../utils/Button';

const HomeSlider = () => {
  const slides = [
    {
      img: '/images/featured/featured_home_1.jpg',
      title: 'Books',
      subTitle: 'For Everyone',
      linkTitle: 'Shop now',
      linkTo: '/books'
    },
    {
      img: '/images/featured/featured_home_2.jpg',
      title: 'Old is gold',
      subTitle: 'Legacy Books Available',
      linkTitle: 'View Books',
      linkTo: '/books'
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };

  const renderSlides = () =>
    slides.map((item, index) => (
      <div key={index}>
        <div className='featured_image' style={{ background: `url(${item.img})`, height: `${window.innerHeight}px` }}>
          <div className='featured_action'>
            <div className='tag title'>{item.title}</div>
            <div className='tag low_title'>{item.subTitle}</div>
            <div>
              <Button type='default' linkTo={item.linkTo} styling={{ margin: '16px 0 0 0' }}>
                {item.linkTitle}
              </Button>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <div className='featured_container'>
      <Slider {...settings}>{renderSlides()}</Slider>
    </div>
  );
};

export default HomeSlider;
