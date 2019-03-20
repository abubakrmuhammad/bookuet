import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/fontawesome-free-solid';
import { List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox, Collapse } from '@material-ui/core';

class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: []
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

  checkboxHandler = id => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) newChecked.push(id);
    else newChecked.splice(currentIndex, 1);

    this.setState({ checked: newChecked }, () => this.props.filtersHandler(newChecked));
  };

  renderListItems = () => {
    if (this.props.items)
      return this.props.items.map(item => (
        <ListItem key={item._id} style={{ padding: '10px 0' }}>
          <ListItemText primary={item.name} />
          <ListItemSecondaryAction>
            <Checkbox
              color='primary'
              onChange={() => this.checkboxHandler(item._id)}
              checked={this.state.checked.indexOf(item._id) !== -1}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ));
  };

  render() {
    return (
      <div className='collapse_items_wrapper'>
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem onClick={this.clickHandler} style={{ padding: '10px 23px 10px 0', cursor: 'pointer' }}>
            <ListItemText primary={this.props.title} className='collapse_title' />
            <FontAwesomeIcon icon={this.arrowDirectionHandler()} className='icon' />
          </ListItem>
          <Collapse in={this.state.open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              {this.renderListItems()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
