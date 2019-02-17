import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
import axios from 'axios';
import InputMask from 'react-input-mask';

import 'src/application.css';

export default class UserPage extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   shifts: props.shifts,
    //   shiftDate: '',
    //   startTime: '',
    //   finishTime: '',
    //   breakLength: '',
    //   responseError: null,
    // };
  }

  updateField = (field) => ({ target }) => {
    this.setState({
      [field]: target.value,
    });
  }

  // createShift = async () => {
  //   const { organisation } = this.props;
  //   const { shiftDate, startTime, finishTime, breakLength } = this.state;

  //   const response = await axios({
  //     method: 'POST',
  //     url: `/shifts`,
  //     data: {
  //       organisation_id: organisation.id,
  //       shift_date: shiftDate,
  //       start_time: startTime,
  //       finish_time: finishTime,
  //       break_length: breakLength,
  //     },
  //   });

  //   if (response.data.errors) {
  //     this.setState({
  //       responseError: response.data.errors,
  //     });
  //   } else {
  //     const { shifts } = response.data;

  //     this.setState({
  //       shifts,
  //       shiftDate: '',
  //       startTime: '',
  //       finishTime: '',
  //       breakLength: '',
  //       responseError: null,
  //     });
  //   }
  // }

  render() {
    const { currentUser } = this.props;

    return (
      <div>
        <h2>{currentUser.name}'s Page</h2>

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
