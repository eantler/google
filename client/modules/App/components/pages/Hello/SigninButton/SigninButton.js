// @flow weak

import React, { PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { makeLoginWithGoogle } from '../../../../AppActions';
import connect from 'react-redux';

const iconStyleSheet = createStyleSheet('Icons', () => ({
  icons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '70%',
  },
}));

const styleSheet = createStyleSheet('RaisedButtons', (theme) => ({
  button: {
    margin: 'auto',
    color: '#FFFFFF',
  },
}));

export default function RaisedButtons(props, context) {
  const classes = context.styleManager.render(styleSheet);
  const iconClasses = context.styleManager.render(iconStyleSheet);
  return (
    <div >
      <Button raised primary className={classes.button} onClick={this.props.dispatch(makeLoginWithGoogle())}>
        <div className={classes.icons}>
        Log In Now With GMAIL Account

        </div>


      </Button>
    </div>
  );
}

RaisedButtons.contextTypes = {
  styleManager: customPropTypes.muiRequired,

};

RaisedButtons.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
