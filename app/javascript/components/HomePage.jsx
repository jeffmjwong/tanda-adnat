import React, { Component } from 'react';
import { PropTypes as T } from 'prop-types';
// import Rails from 'rails-ujs';
import axios from 'axios';

import Header from 'components/Header';


export default class HomePage extends Component {
  constructor(props) {
    super(props);

    // this.state = {};
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
    const { currentUser, logOutUrl } = this.props;

    return (
      <div>
        <Header userName={currentUser.name} logOutUrl={logOutUrl} />

        <div>
          <p>You aren't a member of any organisations. Join an existing one or create a new one.</p>
        </div>

        <h2>Organisations</h2>

        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>

        <h2>Create Organisation</h2>

        <form>
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

          <button onClick={this.submitForm}>Create and Join</button>
        </form>
      </div>
    );
  }
}

HomePage.propTypes = {
  currentUser: T.object.isRequired,
  logOutUrl: T.string.isRequired,
};

// Login.defaultProps = {
//   persistedPicture: null,
//   fuel: '',
//   odometer: 0,
// };
