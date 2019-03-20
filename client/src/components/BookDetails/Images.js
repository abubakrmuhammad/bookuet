import React, { Component } from 'react';
import LightBox from '../../utils/LightBox';

class Images extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    if (this.props.details.images)
      if (this.props.details.images.length > 0) {
        const lightboxImages = [];

        this.props.details.images.forEach(item => lightboxImages.push(item.url));

        this.setState({ lightboxImages });
      }
  }

  lightboxHandler = pos => {
    if (this.state.lightboxImages.length > 0) this.setState({ lightbox: true, imagePos: pos });
  };

  lightboxCloseHandler = () => {
    this.setState({ lightbox: false });
  };

  renderThumbs = () =>
    this.state.lightboxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.lightboxHandler(i)}
          className='thumb'
          style={{ background: `url(${item}) no-repeat` }}
        />
      ) : null
    );

  render() {
    return (
      <div className='product_image_container'>
        <div className='main_pic'>
          <div
            style={{
              background: `url(${
                this.state.lightboxImages.length > 0 ? this.state.lightboxImages[0] : '/images/image_not_available.png'
              }) no-repeat`
            }}
            onClick={() => this.lightboxHandler(0)}
          />
        </div>
        <div className='main_thumbs'>{this.renderThumbs()}</div>
        {this.state.lightbox ? (
          <LightBox
            id={this.props.details.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            pos={this.state.imagePos}
            closed={this.lightboxCloseHandler}
          />
        ) : null}
      </div>
    );
  }
}

export default Images;
