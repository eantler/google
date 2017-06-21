// @flow weak

import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { toggleAdvancedDialog } from '../../AppActions';
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
  raisedButton: {
    margin: theme.spacing.unit,
    color: 'rgb(255, 255, 255)',
    alignSelf: 'center',
    display: 'inline-block',

  },
  button: {
    margin: theme.spacing.unit,
    alignSelf: 'center',
    display: 'inline-block',
  },
}));

export class RaisedButtons extends Component {

  constructor(props,context) {
    super(props);
    this.styleManager = context.styleManager;
  }

  render() {
  const classes = this.styleManager.render(styleSheet);
  const gridClasses = this.styleManager.render(gridStyleSheet);

  return (
    <div>
            <Button raised primary className={classes.raisedButton} onClick={() => {this.props.onClick()}}>Search</Button>
            <Button accent className={classes.button} onClick={() => this.props.dispatch(toggleAdvancedDialog())}>Advanced</Button>
    </div>
  );
  }
}

// () => this.props.onClick()
RaisedButtons.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  showLoader: PropTypes.bool.isRequired,
}
RaisedButtons.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default connect()(RaisedButtons);
//Loader
                //     {this.props.showLoader &&
                //   <CircularProgress className={classes.progress} />
                // }
