// @flow weak

import React ,{ PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import Layout from 'material-ui/Layout';
import Text from 'material-ui/Text';
import SigninButton from './SigninButton/SigninButton';

const styleSheet = createStyleSheet('FullWidthLayout', (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,


  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  numbers: {
    marginLeft: 20,
    lineHeight: '40px',
  },
  layouts: {
    margin: '30px',
  }
}));

export class FullWidthLayout extends Component {

  constructor (props,context) {
    super(props);
  }

  render(props,context) {
  const classes = context.styleManager.render(styleSheet);
  return (
    <div className={classes.root}>
      <Layout container gutter={24} justify='space-around' >
        <Layout item xs={12} >

            <Text type="display3" component="h1" align="center" >
              SimpleBot
            </Text>
        </Layout>
        <Layout item xs={12} >
            <Text type="display1" component="h3" align="center" >
              Connect the team to data
            </Text>
        </Layout>
        <Layout item xs={12} className={classes.layouts}>
            <Text type="subheading" gutterBottom>
            <ol>
              <li className={classes.numbers}>Build commands or stories to guide the users through your data.</li>
              <li className={classes.numbers}>Use your existing queries and connect them to an output format of your choice.</li>
              <li className={classes.numbers}>Then, connect it all to slack so that everyone can enjoy.</li>
              </ol><br/>

              As simple as 1-2-3.

            </Text>
        </Layout>
        <Layout style={{ margin: 'auto'}} item xs={12} className={classes.layouts}>
            <SigninButton/>
        </Layout>
      </Layout>
    </div>
  );
}}

// FullWidthLayout.contextTypes = {
//   //styleManager: customPropTypes.muiRequired,
// };

export default connect()(FullWidthLayout);
