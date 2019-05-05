import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (
  localStorageKey,
  defaultValue
) => WrappedComponent => {
  return class extends Component {
    savedData = () =>
      load(localStorageKey) ? load(localStorageKey) : defaultValue;

    saveData = value => {
      save(localStorageKey, value);
      this.setState({ savedData: value });
    };

    render() {
      return (
        <WrappedComponent {...this.props} savedData={this.savedData()} saveData={this.saveData} />
      );
    }
  };
};

export default withLocalstorage;