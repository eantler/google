// @flow weak

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { toggleAdvancedDialog } from '../../AppActions';
import { createStyleSheet } from 'jss-theme-reactor';
import Chip from 'material-ui/Chip';

// Styles
const styleSheet = createStyleSheet('demoImageAndDialog', () => ({
  memeImage: {
    width: '220px',
    height: '220px',
    align: 'left',
    padding:'1px',
    border:'1px solid #021a40',

  },
  dialog: {
      width: "700px",
      // height:'700px',
  },
  details: {
    fontFamily: 'Tahoma, Arial, sans-serif',
    color: '#2d2d2d',
    fontSize: '18px',
    margin: '15px 0px 0px 0px',
  },
  chip: {
   margin: 3,
 },
 row: {
   display: 'flex',
   justifyContent: 'center',
   flexWrap: 'wrap',
 },
 row: {
   display: 'flex',
   justifyContent: 'initial',
   flexWrap: 'wrap',
   margin: '0px 0px 10px 0px',
 },
}));



export class SearchDialog extends Component {

constructor (props,context) {
    super(props);
    this.styleManager = context.styleManager;
}

  handleRequestClose = () => this.props.dispatch(toggleAdvancedDialog());



  render() {
    let classes = this.styleManager.render(styleSheet);


    return (
      <div>
        <Dialog
          open={this.props.open}
          onRequestClose={this.handleRequestClose}
          paperClassName={classes.dialog}
          // maxWidth={'500px'}
          // width={'100%'}
        >

          <DialogContent>



            <DialogContentText className={classes.details}>
              This is an example text.
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} primary>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// <DialogTitle>{'Explanation'}</DialogTitle>


SearchDialog.propTypes = {
      dispatch: PropTypes.func.isRequired,
      // clusterId: PropTypes.string.isRequired,
      // memeId: PropTypes.string.isRequired,

};

SearchDialog.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

function mapStateToProps(store) {
  return {
    open: store.app.isAdvancedOpen,
    tags: store.app.tags,
  };
}

export default connect(mapStateToProps)(SearchDialog);
