import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import axios from 'axios';
import InputMask from 'react-input-mask';

import 'src/application.css';
import Shift from 'components/Shift';

export default class Shifts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shifts: props.shifts,
      shiftDate: '',
      startTime: '',
      finishTime: '',
      breakLength: '',
      filterFrom: '',
      filterTo: '',
      responseError: null,
    };
  }

  updateField = (field) => ({ target }) => {
    this.setState({
      [field]: target.value,
    });
  }

  deleteShift = async (id) => {
    const { shifts } = this.state;

    const response = await axios({
      method: 'DELETE',
      url: `/shifts/${id}`,
    });

    if (response.data.errors) {
      this.setState({
        responseError: response.data.errors,
      });
    } else {
      this.setState({
        shifts: shifts.filter((shift) => shift.id !== id),
        responseError: null,
      });
    }
  }

  createShift = async () => {
    const { organisation } = this.props;
    const { shiftDate, startTime, finishTime, breakLength } = this.state;

    const response = await axios({
      method: 'POST',
      url: '/shifts',
      data: {
        organisation_id: organisation.id,
        shift_date: shiftDate,
        start_time: startTime,
        finish_time: finishTime,
        break_length: breakLength,
      },
    });

    if (response.data.errors) {
      this.setState({
        responseError: response.data.errors,
      });
    } else {
      const { shifts } = response.data;

      this.setState({
        shifts,
        shiftDate: '',
        startTime: '',
        finishTime: '',
        breakLength: '',
        filterFrom: '',
        filterTo: '',
        responseError: null,
      });
    }
  }

  filterShifts = async () => {
    const { organisation } = this.props;
    const { filterFrom, filterTo } = this.state;

    const response = await axios({
      method: 'POST',
      url: '/shifts/filter',
      data: {
        organisation_id: organisation.id,
        filter_from: filterFrom,
        filter_to: filterTo,
      },
    });

    this.setState({
      shifts: response.data.shifts,
    });
  }

  render() {
    const { organisation, currentUser } = this.props;
    const {
      shifts,
      shiftDate,
      startTime,
      finishTime,
      breakLength,
      filterFrom,
      filterTo,
      responseError
    } = this.state;

    return (
      <div>
        <h2>{organisation.name}</h2>
        <h3>Shifts</h3>

        <div className='margin-small-y'>
          <label>
            From:
            <InputMask
              mask='99/99/9999'
              placeholder='DD/MM/YYYY'
              value={filterFrom}
              onChange={this.updateField('filterFrom')}
            />
          </label>
          <label className='margin-small-x'>
            To:
            <InputMask
              mask='99/99/9999'
              placeholder='DD/MM/YYYY'
              value={filterTo}
              onChange={this.updateField('filterTo')}
            />
          </label>

          <button onClick={this.filterShifts}>
            Filter
          </button>
        </div>

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
                <Shift
                  key={shift.id}
                  shift={shift}
                  deleteShift={this.deleteShift}
                />
              ))
            }

            <tr>
              <td>{currentUser.name}</td>
              <td>
                <InputMask
                  mask='99/99/9999'
                  placeholder='DD/MM/YYYY'
                  value={shiftDate}
                  onChange={this.updateField('shiftDate')}
                />
              </td>
              <td>
                <InputMask
                  mask='99:99'
                  placeholder='hh:mm (24-hour format)'
                  value={startTime}
                  onChange={this.updateField('startTime')}
                />
              </td>
              <td>
                <InputMask
                  mask='99:99'
                  placeholder='hh:mm (24-hour format)'
                  value={finishTime}
                  onChange={this.updateField('finishTime')}
                />
              </td>
              <td>
                <input
                  value={breakLength}
                  onChange={this.updateField('breakLength')}
                />
              </td>
              <td colSpan='2'>
                <button onClick={this.createShift}>Create Shift</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className='margin-small-y'>
          <button onClick={() => window.open('/', '_self')}>Back To Home Page</button>
        </div>

        {
          responseError && <p style={{color: 'red'}}>Error: {responseError}</p>
        }
      </div>
    );
  }
}

Shifts.propTypes = {
  shifts: T.arrayOf(T.object),
  organisation: T.object.isRequired,
  currentUser: T.object.isRequired,
};

Shifts.defaultProps = {
  shifts: [],
};
