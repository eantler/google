// @flow weak

import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('ChipsArray', (theme) => ({
  chip: {
    margin: theme.spacing.unit / 2,
  },
  row: {
    display: 'flex',
    justifyContent: 'left',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  preText: {
    margin: '10px 10px 0px 0px',
  },
  chipLabel: {
    fontSize: '20px',
  }
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
          labelClassName={classes.chipLabel}
        />
      );
    };

    return (
      <div className={classes.row}>
        <Typography type="title" className={classes.preText} >
            Inserted Tags:
        </Typography>
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
