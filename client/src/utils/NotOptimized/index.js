import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/fontawesome-free-solid';

class NotOptimized extends Component {
  state = {
    show: true
  };

  render() {
    return (
      <div className={`not_optimized ${this.state.show}`}>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <div>This site is not optimized for mobile devices</div>
        <button onClick={() => this.setState({ show: false })}>Continue Anyway</button>
      </div>
    );
  }
}

export default NotOptimized;
