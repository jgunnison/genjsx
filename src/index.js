#!/usr/bin/env node
'use strict';

// Dependency Requires
const fs = require('fs-extra'),
			prompt = require('prompt'),
			shell = require('shelljs'),
			v = require('voca');


// JSX Class Component Template
const classTemplate = (name) => { return (`import React, {Component} from 'react'

export default class ${name} extends Component {
  state = { stateBool: true }

  static propTypes = {
    text: React.PropTypes.string,
  }

  static defaultProps = {
    text: 'Hello; World',
  }

  handleOnClick = (e) => {
    e.preventDefault()
  }
  
  render() {
    const {
      text,
    } = this.props

    const {
      stateBool,
    } = this.state

    return ( 
      <div onClick={ this.handleOnClick }>{ text }</div>
    )
  }
}
`)};

// JSX Pure Component Template
const pureTemplate = (name) => { return (`import React from 'react'

const ${name}RequiredProps = {
  stateBool: React.PropTypes.bool,
  text: React.PropTypes.string,
}

function ${name}({ text, stateBool = true }) {
  return (
  	<div>{ text }</div>
  )
}

${name}.propTypes = ${name}RequiredProps

export default ${name}
`)};

// Component Sass/SCSS Template
const scssTemplate = (name) => { return (`.c-${name} {
  &__element {

  }

  &--modifier {

  }
}
`)};

// Schema for the Prompts
const schema = {
  properties: {
    componentName: {
      description: ('Component Name (lowercase w/ spaces): '),
	    type: 'string',
	    required: true,
    },
    componentType: {
      description: ('Is This a Pure Component? (true/false): '),
	    type: 'boolean',
	    default: false,
    }
  }
};

// Start Prompting the Console
prompt.start();

// Get Prompt Results and Create Files
prompt.get(schema, (err, result) => {

  // Return Prompt Answers
  console.log('  Component Name ' + result.componentName);
  console.log('  Is This a Pure Component: ' + result.componentType);

  // Make the Component Directory
  shell.mkdir(`${v.kebabCase(result.componentName)}`);

  // Pure Component Condition
  if (result.componentType === true) {

    // Create Pure Component file
		fs.writeFile(`${v.kebabCase(result.componentName)}/${v.camelCase(result.componentName)}.js`, pureTemplate(v.camelCase(result.componentName)), (err) => {
		  if(err) {
		      return console.log(err);
		  }
		});

	} else {

    // Create Class Component file
		fs.writeFile(`${v.kebabCase(result.componentName)}/${v.camelCase(result.componentName)}.js`, classTemplate(v.camelCase(result.componentName)), (err) => {
		  if(err) {
		      return console.log(err);
		  }
		});

	}

  // Create Sass/SCSS file
	fs.writeFile(`${v.kebabCase(result.componentName)}/_${v.kebabCase(result.componentName)}.scss`, scssTemplate(v.kebabCase(result.componentName)), (err) => {
	  if(err) {
	      return console.log(err);
	  }
	});
  
});
