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
import { toggleImageDialog } from '../../ResultsActions';
import demoPhoto from './demo.jpg';
import Chip from 'material-ui/Chip';


// Styles
import { createStyleSheet, createStyleManager } from 'jss-theme-reactor';;
import { create as createJss } from 'jss';
import preset from 'jss-preset-default';

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
   justifyContent: 'initial',
   flexWrap: 'wrap',
   margin: '0px 0px 10px 0px',
 },
}));



export class ImageDialog extends Component {

constructor (props,context) {
    super(props);
    this.styleManager = createStyleManager({
        jss: createJss(preset()),
        theme: props.theme,
      });
}

  handleRequestClose = () => this.props.dispatch(toggleImageDialog(this.props.clusterId, this.props.memeId));



  render() {
    let classes = this.styleManager.render(styleSheet);
    let clusterIndex = this.props.clusterId != null ? this.props.clusterId : 0;
    let memeIndex = this.props.memeId != null ? this.props.memeId: 0;
    let dphoto = this.props.clusters.length > 0 ? this.props.clusters[clusterIndex].memes[memeIndex].meme : demoPhoto;
    let rank = dphoto != demoPhoto ? this.props.clusters[clusterIndex].memes[memeIndex].rank : 0
    let simScore = dphoto != demoPhoto ? this.props.clusters[clusterIndex].memes[memeIndex].sim_score : 0
    let tags = dphoto != demoPhoto ? this.props.clusters[clusterIndex].memes[memeIndex].tags : []
    let visual_sim_score = dphoto != demoPhoto ? this.props.clusters[clusterIndex].memes[memeIndex].visual_similarity : null
    let explanation = dphoto != demoPhoto ? this.props.clusters[clusterIndex].memes[memeIndex].explanation : null


    const renderChip = (label) => {
      return (
              <Chip
                label={label}
                key={label}
                className={classes.chip}
              />
            )
    };
    return (
      <div>
        <Dialog
          open={this.props.open}
          // onRequestClose={this.handleRequestClose}
          paperClassName={classes.dialog}
          // maxWidth={'500px'}
          // width={'100%'}
        >

          <DialogContent>

            <img src={dphoto} className={classes.memeImage}/>

            <DialogContentText className={classes.details}>
            <div className={classes.row}>{ tags.map(renderChip,tags) }</div>
              Visual Similarity score: {visual_sim_score != null ? visual_sim_score.toFixed(4) : 'NA'} <br/>
              Rank: {rank}# <br/>
              Sim Score: {simScore.toFixed(4)} <br/>
              Explanation: {explanation} <br/>
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// <DialogTitle>{'Explanation'}</DialogTitle>


ImageDialog.propTypes = {
      dispatch: PropTypes.func.isRequired,
      // clusterId: PropTypes.string.isRequired,
      // memeId: PropTypes.string.isRequired,

};

ImageDialog.contextTypes = {
  //styleManager: customPropTypes.muiRequired,
};

function mapStateToProps(store) {
  return {
    open: store.results.isDialogOpen,
    clusterId: store.results.clusterId,
    memeId: store.results.memeId,
    clusters: store.app.searchResults,
  };
}

export default connect(mapStateToProps)(ImageDialog);
