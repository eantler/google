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
import Grid from 'material-ui/Grid';

// Import Actions


//Create StyleSheets

const styleSheet = createStyleSheet('SimpleMediaCard', () => ({
  wideCard: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    maxWidth: 200,
    margin: '10px',
    
  },
  photo: {
    width: 200,
    height: 200,
  },
  inliner: {
    display: 'inline-block',
    justifyItems: 'center',
  },
  wideCenter: {
    width: '100%',
    alignItems: 'center',
  }
}));

const gridStyleSheet = createStyleSheet('FullWidthGrid', (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cardHeader: {
    padding: '5px 0px 0px 16px',
  },
  cardContent: {
    padding: '5px 0px 16px 16px',
    justifyItems: 'center',
  }
}));


export class Results extends Component {

  constructor(props, context) {
    super(props);
    this.render = this.render.bind(this);
    this.styleManager = context.styleManager;
  }


  render() {
    let clusterClasses = this.styleManager.render(styleSheet);
    let gridClasses = this.styleManager.render(gridStyleSheet);

    return (
      <div className={gridClasses.root}>
        <Grid container gutter={24} justify='center'>
          {
            this.props.results.map((item,i) => {
              return (
                <Grid item xs={11} key={item.uniqueID}>
                      <Card className={clusterClasses.wideCard}>   
                        <CardHeader title={item.name} className={gridClasses.cardHeader}/>
                        <CardContent className={gridClasses.cardContent}>
                            <ClusterItem photos={item.memes} classes={clusterClasses} fatherKey={item.uniqueID}/>
                        </CardContent>
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
