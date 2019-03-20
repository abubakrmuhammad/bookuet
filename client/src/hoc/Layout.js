import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getSiteInfo } from '../actions/site_actions';

class Layout extends Component {
  componentDidMount() {
    if (Object.keys(this.props.site).length === 0) this.props.dispatch(getSiteInfo());
  }

  render() {
    return (
      <div>
        <Header />
        <div className='page_container'>{this.props.children}</div>
        <Footer siteInfo={this.props.site.siteInfo} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site
  };
};

export default connect(mapStateToProps)(Layout);
