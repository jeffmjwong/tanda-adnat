import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import axios from 'axios';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  logOut = () => {
    const { logOutUrl } = this.props;

    axios.delete(logOutUrl)
      .then((response) => {
        debugger;
      })
      .catch((error) => {
        debugger;
      });
  }

  render() {
    const { userName } = this.props;

    return (
      <div>
        <span>Logged in as {userName}</span>
        <button onClick={this.logOut}>Log Out</button>
      </div>
    );
  }
}

Header.propTypes = {
  userName: T.string.isRequired,
  logOutUrl: T.string.isRequired,
};
