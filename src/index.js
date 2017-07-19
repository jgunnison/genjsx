#!/usr/bin/env node
'use strict';

// Dependency Requires
const fs = require('fs'),
			prompt = require('prompt'),
			shell = require('shelljs'),
			_ = require('lodash');


// JSX Class Component Template
const classTemplate = (name) => { return (`import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ${name} extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: 'Hello; World',
  };

  state = { stateBool: true };

  handleOnClick = (e) => {
    e.preventDefault();
  };

  render() {
    const {
      text,
    } = this.props;

    const {
      stateBool,
    } = this.state;

    return (
      <button onClick={this.handleOnClick}>{text}</button>
    );
  }
}
`)};

// JSX Pure Component Template
const pureTemplate = (name) => { return (`import React from 'react';
import PropTypes from 'prop-types';

function ${name}({ text, stateBool = true }) {
  return (
    <div>{text}</div>
  );
}

${name}.propTypes = {
  stateBool: PropTypes.bool,
  text: PropTypes.string,
};

export default ${name};
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

  // Create text formatting variables
  const camelCaseName = _.camelCase(result.componentName);
  const capitalizedCaseName = _.upperFirst(camelCaseName);
  const kebabCaseName = _.kebabCase(result.componentName);

  // Make the Component Directory
  shell.mkdir(`${kebabCaseName}`);

  // Pure Component Condition
  if (result.componentType === true) {

    // Create Pure Component file
		fs.writeFile(`${kebabCaseName}/${camelCaseName}.js`, pureTemplate(capitalizedCaseName), (err) => {
		  if(err) {
		      return console.log(err);
		  }
		});

	} else {

    // Create Class Component file
		fs.writeFile(`${kebabCaseName}/${camelCaseName}.js`, classTemplate(capitalizedCaseName), (err) => {
		  if(err) {
		      return console.log(err);
		  }
		});

	}

  // Create Sass/SCSS file
	fs.writeFile(`${kebabCaseName}/_${kebabCaseName}.scss`, scssTemplate(kebabCaseName), (err) => {
	  if(err) {
	      return console.log(err);
	  }
	});
  
});
