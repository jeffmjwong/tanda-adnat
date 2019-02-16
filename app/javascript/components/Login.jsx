import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
// import Rails from 'rails-ujs';
import axios from 'axios';
// import createAlert from 'js/alert';

// import { FaCameraRetro } from 'react-icons/fa';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  // componentWillMount() {
  //   const { persistedPicture } = this.props;

  //   if (persistedPicture) {
  //     this.setState({
  //       previewPicture: true,
  //       dashboardPicture: persistedPicture,
  //     }, () => {
  //       this.displayDashboardPicture(
  //         persistedPicture,
  //         this.canvasRef.current,
  //         this.CANVAS_WIDTH,
  //         this.CANVAS_HEIGHT,
  //       );
  //     });
  //   }
  // }

  // componentDidUpdate() {
  //   const { odometer, fuel, dashboardPicture } = this.state;

  //   const dashboardSubmitButton = document.getElementById('submit-dashboard');

  //   if (!odometer || !fuel || !dashboardPicture) {
  //     dashboardSubmitButton.classList.add('button-disabled');
  //   } else {
  //     dashboardSubmitButton.classList.remove('button-disabled');
  //   }
  // }

  updateField = field => ({ target }) => {
    this.setState({
      [field]: target.value,
    });
  }

  submitForm = () => {
    const { email, password } = this.state;

    axios.post('/authentication/submit_login', { email, password })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  // handleSubmit = async (evt) => {
  //   evt.preventDefault();

  //   const dashboardSubmitButton = document.getElementById('submit-dashboard');

  //   dashboardSubmitButton.innerHTML = 'Upload...';
  //   dashboardSubmitButton.classList.add('small-button-loading', 'button-disabled');

  //   const { updateUrl, redirectUrl } = this.props;
  //   const { odometer, fuel, dashboardPicture } = this.state;

  //   const attributes = { odometer, fuel, dashboardPicture };

  //   const formData = new FormData();

  //   Object.keys(attributes).forEach((key) => {
  //     if (key === 'dashboardPicture' && attributes[key]) {
  //       formData.append('checkout[dashboard_picture]', attributes[key]);
  //     } else if (attributes[key]) {
  //       formData.append(`checkout[${key}]`, attributes[key]);
  //     }
  //   });

  //   try {
  //     const res = await axios({
  //       method: 'PUT',
  //       url: updateUrl,
  //       headers: {
  //         // 'X-CSRF-Token': Rails.csrfToken(),
  //       },
  //       data: formData,
  //     });

  //     if (res.status === 202) {
  //       dashboardSubmitButton.innerHTML = 'Save';
  //       dashboardSubmitButton.classList.remove('small-button-loading', 'button-disabled');

  //       Turbolinks.visit(redirectUrl);
  //     }
  //   } catch (error) {
  //     dashboardSubmitButton.innerHTML = 'Save';
  //     dashboardSubmitButton.classList.remove('small-button-loading', 'button-disabled');

  //     document.body.appendChild(createAlert(error.response.data.error));
  //   }
  // }

  render() {
    return (
      <div>
        <h1>Adnat</h1>
        <h2>Log in</h2>

        <form>
          <label>
            Email
            <input
              onChange={this.updateField('email')}
            />
          </label>
          <label>
            Password
            <input
              onChange={this.updateField('password')}
            />
          </label>
        </form>

        <button onClick={this.submitForm}>Login</button>
      </div>
    );
  }
}

// Login.propTypes = {
//   persistedPicture: T.string,
//   updateUrl: T.string.isRequired,
//   redirectUrl: T.string.isRequired,
//   fuel: T.string,
//   odometer: T.number,
// };

// Login.defaultProps = {
//   persistedPicture: null,
//   fuel: '',
//   odometer: 0,
// };
