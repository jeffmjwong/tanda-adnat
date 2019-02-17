import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import axios from 'axios';

import 'src/application.css';

export default class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.currentUser.name,
      email: props.currentUser.email,
      password: '',
      responseSuccess: '',
      responseError: null,
    };
  }

  updateField = (field) => ({ target }) => {
    this.setState({
      [field]: target.value,
    });
  }

  updateUser = async () => {
    const { currentUser } = this.props;
    const { name, email, password } = this.state;

    const response = await axios({
      method: 'PUT',
      url: `/users/${currentUser.id}`,
      data: { name, email, password },
    });

    if (response.data.errors) {
      this.setState({
        responseSuccess: '',
        responseError: response.data.errors,
      });
    } else {
      this.setState({
        password: '',
        responseSuccess: 'User Updated!',
        responseError: null,
      });
    }
  }

  render() {
    const { currentUser } = this.props;
    const { name, email, password, responseSuccess, responseError } = this.state;

    return (
      <div>
        <h2>{currentUser.name}'s Page</h2>

        <div>
          <label>
            Name:
            <input
              value={name}
              onChange={this.updateField('name')}
            />
          </label>
        </div>

        <div className='margin-small-y'>
          <label>
            Email:
            <input
              value={email}
              onChange={this.updateField('email')}
            />
          </label>
        </div>

        <div className='margin-small-y'>
          <label>
            Password:
            <input
              placeholder='**********'
              value={password}
              onChange={this.updateField('password')}
            />
          </label>
        </div>

        <div>
          <button onClick={this.updateUser}>Update</button>
        </div>

        <div className='margin-small-y'>
          <button onClick={() => window.open('/', '_self')}>Back To Home Page</button>
        </div>

        {
          responseSuccess && <p style={{color: 'green'}}>{responseSuccess}</p>
        }

        {
          responseError && <p style={{color: 'red'}}>Error: {responseError}</p>
        }
      </div>
    );
  }
}

UserPage.propTypes = {
  currentUser: T.object.isRequired,
};
