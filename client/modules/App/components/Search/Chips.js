// @flow weak

import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Chip from 'material-ui/Chip';

const styleSheet = createStyleSheet('ChipsArray', (theme) => ({
  chip: {
    margin: theme.spacing.unit / 2,
  },
  row: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

export class Chips extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      tags: props.tags,
    }

    this.styleManager = context.styleManager;
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    
  }
  static contextTypes = {

  };

  styles = {
    chip: {
      margin: 4,
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };



  handleRequestDelete = (key) => {
    this.props.onDelete(key);
  };

  render() {
    const classes = this.styleManager.render(styleSheet);

    const renderChip = (data) => {
      return (
        <Chip
          label={data.label}
          key={data.key}
          onRequestDelete={() => this.handleRequestDelete(data.key)}
          className={classes.chip}
        />
      );
    };

    return (
      <div className={classes.row}>
        {this.props.displayTags.map(renderChip, this)}
      </div>
    );
  }


}
Chips.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
Chips.propTypes = {
  //tags: PropTypes.array.isRequired
  displayTags: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
}

function mapStateToProps(store) {
      return {
        displayTags: store.app.tags,
      };
  }
export default connect(mapStateToProps)(Chips);
