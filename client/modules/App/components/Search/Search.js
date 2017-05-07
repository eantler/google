// @flow weak

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import SearchInput from './SearchInput';
import Chips from './Chips';
import SearchButton from './SearchButton';
import Layout from 'material-ui/Layout';
import { performAddTag, performRemovetag } from '../../AppActions';

const styleSheet = createStyleSheet('PaperSheet', (theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 50,
    paddingBottom: 16,
    background: '#FFFFFF',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    //flexWrap: 'nowrap',
    alignItems: 'center',
  }),
}));
function handleChange(chips) {
    alert(JSON.stringify(chips));
}
//    <Paper className={classes.root} elevation={4}>
export class Search extends Component {


    constructor(props, context) {
      super(props);
      this.state = { isMounted: false,
                      tags: [],
                      inputText: '',
                      };
      this.styleManager = context.styleManager;
      this.HandleEnterClick = this.HandleEnterClick.bind(this);
      this.performAddTag = performAddTag.bind(this);
      this.performRemovetag = performRemovetag.bind(this);
      this.HandleDelete = this.HandleDelete.bind(this);
  }

    componentDidMount() {
      this.setState({isMounted: true}); // eslint-disable-line

    }

    HandleEnterClick(text) {
      this.props.dispatch(performAddTag(text));
    }

    HandleDelete(id) {
      this.props.dispatch(performRemovetag(id));
    }

  render() {
    const classes = this.styleManager.render(styleSheet);

    return (
    <div className={classes.root}>
    <Layout container gutter={24}>
    <Layout item xs={12}>
          <SearchInput text={this.state.inputText} onEnter={this.HandleEnterClick}/>
          <Chips tags={this.props.tags} onDelete={this.HandleDelete}/>
          <SearchButton/>
    </Layout>
    </Layout>
        </div>
      );
    }


}



        Search.propTypes = {
          dispatch: PropTypes.func.isRequired,

        };

function mapStateToProps(store) {
      return {
        tags: store.app.tags,
      };
  }

Search.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default connect(mapStateToProps)(Search);
