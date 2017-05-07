// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';

const styleSheet = createStyleSheet('ComposedTextField', () => ({
  container: {

    display: 'block',
    width: '100%',


  },
  input: {
    margin: 10,
    textAlign:'center',

  },
  inputText: {
      color: '#000000',

  },
}));

export default class SearchInput extends Component {

  constructor(props,context) {
    super(props);
    this.state = {
      text: '',
      onEnter: props.onEnter,
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };
  static propTypes = {
    text: PropTypes.string,
    onEnter: PropTypes.func,
  };

  state = {
    name: '',
  };

  handleKeyPress(target) {
     if(target.charCode==13){
             this.state.onEnter(this.state.text);
             this.setState({text : '', });
     }



 }
  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <div className={classes.container}>
        <FormControl className={classes.input}>
          <InputLabel htmlFor="name">
            Enter tag and press enter
          </InputLabel>
          <Input
            id="name"
            value={this.state.text}
            onChange={(event) => this.setState({ text: event.target.value })}
            onKeyPress={this.handleKeyPress}
            className={classes.inputText}
          />
        </FormControl>
      </div>
    );
  }
}
