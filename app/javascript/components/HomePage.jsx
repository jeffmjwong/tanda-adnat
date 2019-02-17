import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import axios from 'axios';

import 'src/application.css';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organisations: props.organisations,
      organisation: props.organisation,
      name: '',
      hourlyRate: '',
      responseError: null,
    };
  }

  updateField = (field) => ({ target }) => {
    this.setState({
      [field]: target.value,
    });
  }

  editOrganisation = (id) => {
    window.open(`/organisations/${id}`, '_self');
  }

  viewShifts = async (id) => {
    window.open(`/organisations/${id}/shifts`, '_self');
  }

  joinOrganisation = async (id) => {
    const response = await axios({
      method: 'PUT',
      url: `/users/join_organisation`,
      data: { organisation_id: id },
    });

    if (response.data.errors) {
      this.setState({
        responseError: response.data.errors,
      });
    } else {
      this.setState({
        organisation: response.data.organisation,
        responseError: null,
      });
    }
  }

  createOrganisation = async () => {
    const { organisations, name, hourlyRate } = this.state;

    const response = await axios({
      method: 'POST',
      url: `/organisations`,
      data: { name, hourly_rate: hourlyRate },
    });

    if (response.data.errors) {
      this.setState({
        responseError: response.data.errors,
      });
    } else {
      const { organisation } = response.data;

      this.setState({
        organisations: [...organisations, organisation],
        organisation,
        responseError: null,
      });
    }
  }

  leaveOrganisation = async () => {
    const response = await axios({
      method: 'PUT',
      url: `/users/leave_organisation`,
      data: { organisation_id: null },
    });

    if (response.data.errors) {
      this.setState({
        responseError: response.data.errors,
      });
    } else {
      this.setState({
        organisation: null,
        responseError: null,
      });
    }
  }

  render() {
    const { organisations, organisation, responseError } = this.state;

    return (
      <div>
        {
          organisation ?
            <div>
              <h2>{organisation.name}</h2>

              <button onClick={() => this.viewShifts(organisation.id)}>
                View Shifts
              </button>
              <button onClick={() => this.editOrganisation(organisation.id)} className='margin-small-x'>
                Edit
              </button>
              <button onClick={this.leaveOrganisation}>
                Leave
              </button>
            </div> :
            <div>
              <div>
                <p>You aren't a member of any organisations. Join an existing one or create a new one.</p>
              </div>

              <h2>Organisations</h2>

              <ul>
                {
                  organisations.map((organisation) => (
                    <li key={organisation.id}>
                      <span>{organisation.name} </span>

                      <button onClick={() => this.editOrganisation(organisation.id)} className='margin-small-x'>
                        Edit
                      </button>
                      <button onClick={() => this.joinOrganisation(organisation.id)}>
                        Join
                      </button>
                    </li>
                  ))
                }
              </ul>

              <h2>Create Organisation</h2>

              <div>
                <label>
                  Name:
                  <input
                    onChange={this.updateField('name')}
                  />
                </label>
              </div>

              <div className='margin-small-y'>
                <label>
                  Hourly Rate: $
                  <input
                    onChange={this.updateField('hourlyRate')}
                  />
                  per hour
                </label>
              </div>

              <button onClick={this.createOrganisation} className='margin-small-y'>
                Create and Join
              </button>
            </div>
        }

        {
          responseError && <p style={{color: 'red'}}>Error: {responseError}</p>
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  organisations: T.arrayOf(T.object).isRequired,
  organisation: T.object,
};

HomePage.defaultProps = {
  organisation: null,
}
