import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid';
import { List, ListItem, ListItemText, Radio, RadioGroup, FormControlLabel, Collapse } from '@material-ui/core';

class CollapseRadio extends Component {
  state = {
    open: false,
    checked: '0'
  };

  componentDidMount() {
    if (this.props.opened) this.setState({ open: this.props.opened });
  }

  clickHandler = () => {
    this.setState({ open: !this.state.open });
  };

  arrowDirectionHandler = () => {
    if (this.state.open) return faAngleUp;
    return faAngleDown;
  };

  changeHandler = event => {
    this.props.filtersHandler(event.target.value);
    this.setState({ checked: event.target.value });
  };

  renderListItems = () => {
    if (this.props.items)
      return this.props.items.map(item => (
        <FormControlLabel key={item._id} value={`${item._id}`} control={<Radio />} label={item.name} />
      ));
  };

  render() {
    return (
      <div>
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem onClick={this.clickHandler} style={{ padding: '10px 23px 10px 0', cursor: 'pointer' }}>
            <ListItemText primary={this.props.title} className='collapse_title' />
            <FontAwesomeIcon icon={this.arrowDirectionHandler()} className='icon' />
          </ListItem>
          <Collapse in={this.state.open} timeout='auto' unmountOnExit>
            <List component='div' style={{ paddingLeft: '16px' }} disablePadding>
              <RadioGroup name='price' value={this.state.checked} onChange={this.changeHandler}>
                {this.renderListItems()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseRadio;
