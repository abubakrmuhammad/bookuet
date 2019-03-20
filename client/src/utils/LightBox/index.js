import React, { Component } from 'react';
import Lightbox from 'react-images';

class LightBox extends Component {
  state = {
    isOpen: true,
    currentImage: this.props.pos,
    images: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = props.images.map(item => {
        return { src: `${item}` };
      });

      return { images };
    }

    return false;
  }

  goToNextHandler = () => this.setState({ currentImage: this.state.currentImage + 1 });

  goToPrevHandler = () => this.setState({ currentImage: this.state.currentImage - 1 });

  render() {
    return (
      <Lightbox
        currentImage={this.state.currentImage}
        images={this.state.images}
        isOpen={this.state.isOpen}
        onClickPrev={this.goToPrevHandler}
        onClickNext={this.goToNextHandler}
        onClose={this.props.closed}
      />
    );
  }
}

export default LightBox;
