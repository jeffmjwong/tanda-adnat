import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import axios from 'axios';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      organisation: props.organisation,
      responseError: null,
    };
  }

  updateField = field => ({ target }) => {
    this.setState({
      [field]: target.value,
    });
  }

  joinOrganisation = async (id) => {
    const response = await axios({
      method: 'PUT',
      url: `users/join_organisation`,
      data: { organisation_id: id },
    });

    if (response.data.errors) {
      this.setState({
        responseError: response.data.errors,
      })
    } else {
      this.setState({
        organisation: response.data.organisation,
      })
    }
  }

  leaveOrganisation = async () => {
    const response = await axios({
      method: 'PUT',
      url: `users/leave_organisation`,
      data: { organisation_id: null },
    });

    if (response.data.errors) {
      this.setState({
        responseError: response.data.errors,
      })
    } else {
      this.setState({
        organisation: null,
      })
    }
  }

  render() {
    const { organisations } = this.props;
    const { organisation, responseError } = this.state;

    return (
      <div>
        {
          organisation ?
            <div>
              <h2>{organisation.name}</h2>

              <button>View Shifts</button>
              <button>Edit</button>
              <button onClick={this.leaveOrganisation}>Leave</button>
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

                      <button
                        onClick={() => window.open(`/organisations/${organisation.id}`, '_self')}
                      >
                        Edit
                      </button>

                      <button onClick={() => this.joinOrganisation(organisation.id)}>Join</button>
                    </li>
                  ))
                }
              </ul>

              <h2>Create Organisation</h2>

              <div>
                <label>
                  Name:
                  <input
                    onChange={this.updateField('email')}
                  />
                </label>
              </div>

              <div>
                <label>
                  Hourly Rate: $
                  <input
                    onChange={this.updateField('password')}
                  />
                  per hour
                </label>
              </div>

              <button onClick={this.createOrganisation}>Create and Join</button>
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
