import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';

import 'src/application.css';

export default class Shift extends Component {
  constructor(props) {
    super(props);
  }

  updateField = (field) => ({ target }) => {
    this.setState({
      [field]: target.value,
    });
  }

  render() {
    const { shift, deleteShift } = this.props;

    return (
      <tr>
        <td>{shift.employee_name}</td>
        <td>{shift.shift_date}</td>
        <td>{shift.start_time}</td>
        <td>{shift.finish_time}</td>
        <td>{shift.break_length}</td>
        <td>{shift.hours_worked}</td>
        <td>{shift.shift_cost}</td>
        <td style={{border: 'none'}}>
          <button onClick={() => deleteShift(shift.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

Shift.propTypes = {
  shift: T.object,
  deleteShift: T.func.isRequired,
};

Shift.defaultProps = {
  shift: null,
};
