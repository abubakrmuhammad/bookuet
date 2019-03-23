import React, { Component } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';

class SortBy extends Component {
  changeHandler = event => {
    this.props.changed(event.target.value);
  };

  renderListItems = () => {
    if (this.props.items)
      return this.props.items.map((item, i) => (
        <MenuItem key={i} value={`${item.value}`}>
          {item.name}
        </MenuItem>
      ));
  };

  render() {
    return (
      <div style={{ borderBottom: '1px solid #ccc', padding: '16px 0px' }}>
        <InputLabel
          style={{
            display: 'inline-block',
            textTransform: 'uppercase',
            fontWeight: '700',
            width: '150px',
            color: 'rgba(0,0,0,0.87)',
            marginRight: ''
          }}>
          Sort By
        </InputLabel>
        <Select value={this.props.value} style={{ width: '150px' }} onChange={this.changeHandler}>
          {this.renderListItems()}
        </Select>
      </div>
    );
  }
}

export default SortBy;
