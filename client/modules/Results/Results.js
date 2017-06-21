import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Import Components
import ClusterItem from './components/ClusterItem/ClusterItem'
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Forward from 'material-ui-icons/Forward';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';


// Import Actions
import { moreClicked } from '../App/AppActions';

//Create StyleSheets

const styleSheet = createStyleSheet('SimpleMediaCard', () => ({
  wideCard: {
    width: '80%',
    backgroundColor: '#eeeeee',
  },
  card: {
    maxWidth: 220,
    margin: '10px',

  },
  photo: {
    width: 220,
    height: 220,
  },
  inliner: {
    display: 'inline-block',
    justifyItems: 'center',
    alignItems: 'space-around',

  },
  wideCenter: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  cardActions: {
    // justifyItems: 'right',
    fontSize: '25px',
    // alignItems: 'right',
  },
  actionButton: {
    fontSize: '15px',
  },
  flexGrow: { flex: '1 1 auto' },
}));

const gridStyleSheet = createStyleSheet('FullWidthGrid', (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardHeader: {
    padding: '5px 16px 0px 16px',
    fontSize: '22px',
    fontVariant: 'small-caps',
  },
  cardContent: {
    padding: '5px 16px 0px 16px',
    justifyContent: 'space-around',
    justifyItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
  },


}));



export class Results extends Component {

  constructor(props, context) {
    super(props);
    this.render = this.render.bind(this);
    this.styleManager = context.styleManager;

  }

  HandleMoreClicked(id) {
    this.props.dispatch(moreClicked(id));
  }

  render() {
    let clusterClasses = this.styleManager.render(styleSheet);
    let gridClasses = this.styleManager.render(gridStyleSheet);



    return (
      <div className={gridClasses.root}>
        <Grid container gutter={40} justify='center'>
          {
            this.props.results.map((item,i) => {
              return (
                <Grid item xs={11} key={i} className={gridClasses.cardContainer}>
                      <Card raised={false} className={clusterClasses.wideCard}>
                        <CardHeader title={item.title} className={gridClasses.cardHeader}/>
                        <CardContent className={gridClasses.cardContent}>
                            <ClusterItem photos={item.memes} classes={clusterClasses} isExpanded={item.isExpanded} fatherKey={i.toString()} dispatch={this.props.dispatch}/>
                        </CardContent>
                        <CardActions className={clusterClasses.cardActions}>
                            <div className={clusterClasses.flexGrow} />
                            <Button className={clusterClasses.actionButton} onClick={() => this.HandleMoreClicked(i)}> {item.isExpanded? 'Less' : 'More'}<ExpandMoreIcon/></Button>
                        </CardActions>
                      </Card>
                </Grid>
               )

          })
        }
      </Grid>
    </div>
    )
}

}


Results.propTypes = {
  dispatch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,

};

Results.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    results: store.app.searchResults,
  };
}

export default connect(mapStateToProps)(Results);

// <Header
//   switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
//   intl={this.props.intl}
//   toggleAddPost={this.toggleAddPostSection}
// />
