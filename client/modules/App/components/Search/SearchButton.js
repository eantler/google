// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('RaisedButtons', (theme) => ({
  button: {
    margin: theme.spacing.unit,
    marginTop: '30px',
    color: 'rgb(255, 255, 255)',
    width: '150px',
    fontSize: '16px',
  },
}));

export default function RaisedButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div>
      <Button raised primary className={classes.button} >Search</Button>
    </div>//onClick={this.props.onClick}
  );
}

RaisedButtons.propTypes = {
  onClick: PropTypes.func,
}
RaisedButtons.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};
