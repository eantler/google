// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const gridStyleSheet = createStyleSheet('CenteredGrid', (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
}));

const styleSheet = createStyleSheet('RaisedButtons', (theme) => ({
  button: {
    margin: theme.spacing.unit,
    color: 'rgb(255, 255, 255)',
    width: '150px',
    fontSize: '16px',
    alignSelf: 'center',
    display: 'inline-block',
  }
}));

export default class RaisedButtons extends Component {

  constructor(props,context) {
    super(props);
    this.styleManager = context.styleManager;
  }

  render() {
  const classes = this.styleManager.render(styleSheet);
  const gridClasses = this.styleManager.render(gridStyleSheet);

  return (
    <div>
            <Button raised primary className={classes.button} onClick={() => {this.props.onClick()}}>Search</Button>
            <Button raised accent className={classes.button}>Advanced</Button>
    </div>
  );
  }
}

// () => this.props.onClick()
RaisedButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
  showLoader: PropTypes.bool.isRequired,
}
RaisedButtons.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

//Loader
                //     {this.props.showLoader &&
                //   <CircularProgress className={classes.progress} />
                // }