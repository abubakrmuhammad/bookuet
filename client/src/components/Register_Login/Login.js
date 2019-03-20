import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/user_actions';
import { update, generateData, isFormValid } from '../../utils/Form/formActions';
import FormField from '../../utils/Form/FormField';

class Login extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  formUpdateHandler = element => {
    const newFormData = update(element, this.state.formData, 'login');

    this.setState({ formError: false, formData: newFormData });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'login');
    let isValid = isFormValid(this.state.formData, 'login');

    if (!isValid) this.setState({ formError: true });
    else {
      this.setState({ formError: false });
      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          this.props.history.push('/user/dashboard');
        } else {
          this.setState({ formError: true });
        }
      });
    }
  };

  render() {
    return (
      <div className='signin_wrapper'>
        <form onSubmit={event => this.formSubmitHandler(event)}>
          <FormField
            id='email'
            fieldData={this.state.formData.email}
            changed={element => this.formUpdateHandler(element)}
          />
          <FormField
            id='password'
            fieldData={this.state.formData.password}
            changed={element => this.formUpdateHandler(element)}
          />

          {this.state.formError ? <div className='error_label'>Please check your data</div> : null}

          <button onClick={event => this.formSubmitHandler(event)}>Login</button>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));
