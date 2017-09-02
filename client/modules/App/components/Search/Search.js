// @flow weak

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import SearchInput from './SearchInput';
import Chips from './Chips';
import SearchButton from './SearchButton';
import { clickSearch, performAddTag, performRemovetag } from '../../AppActions';
import { CircularProgress } from 'material-ui/Progress';
import SearchDialog from './SearchDialog';
import Grid from 'material-ui/Grid';
import _ from 'lodash';

//Styles
import { createStyleSheet, createStyleManager } from 'jss-theme-reactor';;
import { create as createJss } from 'jss';
import preset from 'jss-preset-default';


const gridStyleSheet = createStyleSheet('CenteredGrid', (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 60,

  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: 'black',
  },
  buttonContainer: {
    flexBasis: 'auto',
  },


}));

const styleSheet = createStyleSheet('PaperSheet', (theme) => ({
  root: {
    paddingTop: 0,
    paddingBottom: 16,
    background: '#FFFFFF',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'center',
    //flexWrap: 'nowrap',
    alignItems: 'center',
  },
    progress: {
    margin: '5px',
  },
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
      this.styleManager = createStyleManager({
          jss: createJss(preset()),
          theme: props.theme,
        });



      this.HandleEnterClick = this.HandleEnterClick.bind(this);
      this.performAddTag = performAddTag.bind(this);
      this.performRemovetag = performRemovetag.bind(this);
      this.HandleDelete = this.HandleDelete.bind(this);
      this.HandleSearch = this.HandleSearch.bind(this);
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

    HandleSearch() {
      this.props.dispatch(clickSearch(null,_.map(this.props.tags, 'label'),this.props.advanced));
    }

  render() {
    const classes = this.styleManager.render(styleSheet);
    const gridClasses = this.styleManager.render(gridStyleSheet);

    return (
      <div className={gridClasses.root}>
        <SearchDialog/>
         <Grid container direction='row' justify='center' align='center'>
            <Grid item xs={8}>
                <SearchInput text={this.state.inputText} onEnter={this.HandleEnterClick} chips={<Chips tags={this.props.tags} onDelete={this.HandleDelete}/>}/>
            </Grid>
            <Grid item xs={4} className={gridClasses.buttonContainer}>
              <SearchButton onClick={this.HandleSearch} showLoader={this.props.showLoader}/>
            </Grid>
            <Grid item xs={12}>
               <Chips tags={this.props.tags} onDelete={this.HandleDelete}/>
            </Grid>

        </Grid>
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
        advanced: store.app.advancedOptions,
        showLoader: store.app.showLoader,
      };
  }

Search.contextTypes = {
  //styleManager: customPropTypes.muiRequired,
};

export default connect(mapStateToProps)(Search);



      /*<div className='container top-margin-small'>
        <div className='row'>
            <div className='three columns'>
                <SearchInput text={this.state.inputText} onEnter={this.HandleEnterClick}/>
            </div>
        <div className='row'>
            <div className='three columns'>
            </div>
        </div>
        <div className='row'>
            <div className='three columns'>
              <Chips tags={this.props.tags} onDelete={this.HandleDelete}/>
            </div>
        </div>
               <SearchButton onClick={this.HandleSearch} showLoader={this.props.showLoader}/>
        </div>
      </div>*/
