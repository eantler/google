import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Import Components
import ClusterItem from './components/ClusterItem/ClusterItem'
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

// Import Actions

const styleSheet = createStyleSheet('SimpleMediaCard', () => ({
  wideCard: {
    width: '100%',
    margin: '20px',
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
  },
  wideCenter: {
    width: '100%',
    alignItems: 'center',
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
    return (
      <div>
        {
          this.props.results.map((item,i) => {
            return (
            <div className="row" key={item.uniqueID}>              
              <div className='three columns'>
                  <div className='flexi'>
                    <Card className={clusterClasses.wideCard}>   
                      <ClusterItem title={item.name} photos={item.memes} classes={clusterClasses} fatherKey={item.uniqueID}/>
                    </Card>
                  </div>
              </div>
            </div>)

        })
      }
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
