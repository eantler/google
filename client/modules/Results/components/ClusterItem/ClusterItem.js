import React, { Component } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

// Import Style

export default function ClusterItem (props) {

   let response = props.photos.map((photo,i) => {
                return ( 
                   <div className={props.classes.inliner} key={String.prototype.concat(props.fatherKey,i.toString())}>
                     <Card className={props.classes.card} >    
                       <CardMedia>
                         <img src={photo} className={props.classes.photo}/>
                       </CardMedia>
                        </Card>
                   </div>
                )});

  return (<div className={props.classes.wideCenter}>{response}</div>);
 }


ClusterItem.propTypes = {
  title: PropTypes.string.isRequired,
  photos: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  fatherKey: PropTypes.string.isRequired,
};


