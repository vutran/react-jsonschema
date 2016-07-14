import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TabPage from './TabPage';

// Schemas/Datasets
import basicSchema from './schemas/basic.json';
import basicFormData from './dataset/basic.json';
import arraysSchema from './schemas/arrays.json';
import arraysFormData from './dataset/arrays.json';

injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      activeTab: 'basic',
    };
  }

  /**
   * @param {object} e
   * @param {Component} menuItem
   */
  handleMenuClick(e, menuItem) {
    const { value } = menuItem.props;
    this.setState({
      activeTab: value,
    });
    // closes the drawer
    this.handleToggleChange(false);
  }

  /**
   * @param {Boolean} open
   */
  handleToggleChange(open) {
    this.setState({ open });
  }

  handleToggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div>
        <AppBar title="React JSONSchema" onLeftIconButtonTouchTap={::this.handleToggle} />
        <Drawer docked={false} open={this.state.open} onRequestChange={::this.handleToggleChange}>
          <Menu onItemTouchTap={::this.handleMenuClick}>
            <MenuItem value={"basic"}>Basic</MenuItem>
            <MenuItem value={"arrays"}>Arrays</MenuItem>
          </Menu>
        </Drawer>
        <TabPage
          tab={'basic'}
          schema={basicSchema}
          formData={basicFormData}
          visible={activeTab === 'basic'}
        />
        <TabPage
          tab={'arrays'}
          schema={arraysSchema}
          formData={arraysFormData}
          visible={activeTab === 'arrays'}
        />
      </div>
    );
  }
}

export default App;
