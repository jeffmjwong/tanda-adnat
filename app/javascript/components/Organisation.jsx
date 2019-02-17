import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import axios from 'axios';

export default class Organisation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.organisation.id,
      name: props.organisation.name,
      hourlyRate: props.organisation.hourly_rate,
      responseError: null,
    };
  }

  updateField = (field) => ({ target }) => {
    this.setState({
      [field]: target.value,
    });
  }

  updateOrganisation = async (id) => {
    const { name, hourlyRate } = this.state;

    const response = await axios({
      method: 'PUT',
      url: `/organisations/${id}`,
      data: { name, hourly_rate: hourlyRate },
    });

    if (response.data.errors) {
      this.setState({
        responseError: response.data.errors,
      });
    } else {
      this.setState({
        responseError: null,
      }, () => {
        window.open('/', '_self');
      });
    }
  }

  deleteOrganisation = async (id) => {
    const response = await axios({
      method: 'DELETE',
      url: `/organisations/${id}`,
    });

    if (response.data.errors) {
      this.setState({
        responseError: response.data.errors,
      });
    } else {
      this.setState({
        responseError: null,
      }, () => {
        window.open('/', '_self');
      });
    }
  }


  render() {
    const { id, name, hourlyRate, responseError } = this.state;

    return (
      <div>
        <h2>Edit Organisation</h2>

        <div>
          <label>
            Name:
            <input
              value={name}
              onChange={this.updateField('name')}
            />
          </label>
        </div>

        <div>
          <label>
            Hourly Rate: $
            <input
              value={hourlyRate}
              onChange={this.updateField('hourlyRate')}
            />
            per hour
          </label>
        </div>

        <button onClick={() => this.updateOrganisation(id)}>Update</button>
        <button onClick={() => this.deleteOrganisation(id)}>Delete Organisation</button>

        {
          responseError && <p style={{color: 'red'}}>Error: {responseError}</p>
        }
      </div>
    );
  }
}

Organisation.propTypes = {
  organisation: T.object.isRequired,
};
