import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import axios from 'axios';

import 'src/application.css';

export default class Shifts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shifts: props.shifts,
      responseError: null,
    };
  }

  updateField = (field) => ({ target }) => {
    this.setState({
      [field]: target.value,
    });
  }

  render() {
    const { organisation, currentUser } = this.props;
    const { shifts, responseError } = this.state;

    return (
      <div>
        <h2>{organisation.name}</h2>
        <h3>Shifts</h3>

        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Shift Date</th>
              <th>Start Time</th>
              <th>Finish Time</th>
              <th>Break Length (minutes)</th>
              <th>Hours Worked</th>
              <th>Shift Cost</th>
            </tr>
          </thead>

          <tbody>
            {
              shifts.map((shift) => (
                <tr key={shift.id}>
                  <td>{shift.employee_name}</td>
                  <td>{shift.shift_date}</td>
                  <td>{shift.start_time}</td>
                  <td>{shift.finish_time}</td>
                  <td>{shift.break_length}</td>
                  <td>{shift.hours_worked}</td>
                  <td>{shift.shift_cost}</td>
                </tr>
              ))
            }
            <tr>
              <td>{currentUser.name}</td>
              <td><input /></td>
              <td><input /></td>
              <td><input /></td>
              <td><input /></td>
              <td colSpan='2'><button>Create Shift</button></td>
            </tr>
          </tbody>
        </table>

        {
          responseError && <p style={{color: 'red'}}>Error: {responseError}</p>
        }
      </div>
    );
  }
}

Shifts.propTypes = {
  organisation: T.object.isRequired,
  shifts: T.arrayOf(T.object),
  currentUser: T.object.isRequired,
};

Shifts.defaultProps = {
  shifts: [],
};
