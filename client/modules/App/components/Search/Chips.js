// @flow weak

import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Chip from 'material-ui/Chip';
import Typography from 'material-ui/Typography';

//Styles
import { createStyleSheet, createStyleManager } from 'jss-theme-reactor';;
import { create as createJss } from 'jss';
import preset from 'jss-preset-default';

const styleSheet = createStyleSheet('ChipsArray', (theme) => ({
  chip: {
    margin: '2px',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    margin: '0px 0px 20px 0px',
  },
  preText: {
    margin: '10px 10px 0px 0px',
    color: '#40c4ff',
    fontSize: '18px',
    fontFamily: 'Tahoma, Arial, sans-serif',
  },
  chipLabel: {
  }
}));

export class Chips extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      tags: props.tags,
    }

    this.styleManager = createStyleManager({
        jss: createJss(preset()),
        theme: props.theme,
      });

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

        />
      );
    };

    // return (
    //   <div className={classes.row}>
    //     <Typography type="headline" className={classes.preText} >
    //         Query tags:
    //     </Typography>
    //    {this.props.displayTags.map(renderChip, this)}
    //   </div>
    // );

    return (
      <div className={classes.row}>
       {this.props.displayTags.map(renderChip, this)}
      </div>
    );
  }


}
Chips.contextTypes = {
  //styleManager: customPropTypes.muiRequired,
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
