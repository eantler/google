// @flow weak

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { toggleAdvancedDialog } from '../../AppActions';
import { saveAdvancedOptions } from '../../AppActions';
import TextField from 'material-ui/TextField';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import DialogTagsWeight from './dialogTagsWeight';
import FavoriteIcon from 'material-ui-icons/Favorite';



//Styles
import { createStyleSheet, createStyleManager } from 'jss-theme-reactor';;
import { create as createJss } from 'jss';
import preset from 'jss-preset-default';

const styleSheet = createStyleSheet('searchDialog', () => ({
  listRoot: {
  width: '100%',
  maxWidth: 300,
},
sections: {
  width: '100%',
  maxWidth: 300,
  paddingBottom: "8px",
},
  paper: {
      width: '600px',
      height:'500px',
  },
 col: {
   justifyContent: 'center',
   flexWrap: 'wrap',
 },
 input: {
   width: 42,
   fontSize: "15px",
 },
 simSelection: {
   paddingLeft: "16px",
    display: 'flex',
    alignItems: "flex-end",
    justifyContent: "space-between",

 }
}));


export class SearchDialog extends Component {

constructor (props,context) {
    super(props);
    this.styleManager = createStyleManager({
        jss: createJss(preset()),
        theme: props.theme,
      });

    this.state = {
        k:"15",
        method:"semsim",
        visual_factor:"0.2",
        tags_weights:{},
        tempChanges: {},
      };
}



  handleRequestClose = () => this.props.dispatch(toggleAdvancedDialog());
  handleRequestDone = () =>  {
    Object.assign(this.state, {...this.state,...this.state.tempChanges});
    this.state.tempChanges=undefined;
    console.log(JSON.stringify(this.state));
    this.props.dispatch(saveAdvancedOptions(this.state));
  }



  render() {
    const classes = this.styleManager.render(styleSheet);

    // function to render a tag wight textbox for each tag.
    const renderTagsWeights = (data) => {
      return (
          <DialogTagsWeight
            id={data.key}
            key={data.key}
            label={data.label}
            value={data.weight.toString()}
            />
            )
    };


    return (
      <div>
        <Dialog
          open={this.props.open}
        >
          <DialogTitle>{'Advanced Options'}</DialogTitle>
          <DialogContent>

            <DialogContentText>
              Here you can set some advanced search options<br/>
            </DialogContentText>


            <div className={classes.sections}>
              <ListSubheader>Number of Memes</ListSubheader>
                <div className={classes.simSelection}>
                  <TextField
                    id={"number_of_memes"}
                    type="number"
                    defaultValue={this.state.k}
                    className={classes.input}
                    inputProps = {{min:"1", max:"50", step:"1"}}
                    onChange = {event => this.setState({tempChanges: {
                      ...this.state.tempChanges,
                      k: event.target.value ,
                    }})}
                    />
                </div>
            </div>

            <div className={classes.listRoot}>
              <List subheader={<ListSubheader>Tags Weights</ListSubheader>}>
                { this.props.tags.map(renderTagsWeights,this.props.tags) }
              </List>
            </div>

            <div className={classes.sections}>
            <ListSubheader>Similarity Method</ListSubheader>
              <div className={classes.simSelection}>
                <select
                name="similarity method" defaultValue={this.state.method}
                onChange = {event => this.setState({tempChanges: {
                  ...this.state.tempChanges,
                  method: event.target.value,
                }})}
                 >
                  <option value="semsim">Semsim</option>
                  <option value="another method">Another Method</option>
                  <option value="other method">Other Method</option>
                </select>
              </div>
            </div>

            <div className={classes.sections}>
              <ListSubheader>Visual Similarity Weight</ListSubheader>
                <div className={classes.simSelection}>
                  <TextField
                    id={"visual_similarity"}
                    type="number"
                    defaultValue={this.state.visual_factor}
                    className={classes.input}
                    inputProps = {{min:"0", max:"1", step:"0.1"}}
                    onChange = {event => this.setState({tempChanges: {
                      ...this.state.tempChanges,
                      visual_factor: event.target.value,
                    }})}
                    />
                </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleRequestClose}>Cancel</Button>
            <Button color="primary" onClick={this.handleRequestDone}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


SearchDialog.propTypes = {
      dispatch: PropTypes.func.isRequired,

};

SearchDialog.contextTypes = {
  //styleManager: customPropTypes.muiRequired,
};

function mapStateToProps(store) {
  return {
    open: store.app.isAdvancedOpen,
    tags: store.app.tags,
  };
}

export default connect(mapStateToProps)(SearchDialog);
