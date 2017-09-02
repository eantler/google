// @flow weak

import React, { Component, PropTypes } from 'react';

import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';

//Styles
import { createStyleSheet, createStyleManager } from 'jss-theme-reactor';;
import { create as createJss } from 'jss';
import preset from 'jss-preset-default';


const styleSheet = createStyleSheet('ComposedTextField', () => ({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    margin: 10,
    textAlign:'center',
  },
  inputText: {
      color: '#000000',
      fontFamily: 'Tahoma, Arial, sans-serif',
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
    this.styleManager = createStyleManager({
        jss: createJss(preset()),
        theme: props.theme,
      });

  }

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
    const classes = this.styleManager.render(styleSheet);

    return (

        <FormControl className={classes.input}>
          <InputLabel htmlFor="name">
            Enter a tag and press enter
          </InputLabel>
          <Input
            id="name"
            value={this.state.text}
            onChange={(event) => this.setState({ text: event.target.value })}
            onKeyPress={this.handleKeyPress}
            className={classes.inputText}
          ></Input>
        </FormControl>
    );
  }
}
