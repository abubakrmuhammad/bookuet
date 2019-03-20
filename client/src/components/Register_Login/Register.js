import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/user_actions';
import { update, generateData, isFormValid } from '../../utils/Form/formActions';
import { Dialog } from '@material-ui/core';
import FormField from '../../utils/Form/FormField';

class Register extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      firstname: {
        element: 'input',
        value: '',
        config: {
          name: 'firstname',
          type: 'text',
          placeholder: 'Enter your First Name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname',
          type: 'text',
          placeholder: 'Enter your Last Name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
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
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password',
          type: 'password',
          placeholder: 'Confirm your password'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  };

  formUpdateHandler = element => {
    const newFormData = update(element, this.state.formData, 'register');

    this.setState({ formData: newFormData });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'register');
    let isValid = isFormValid(this.state.formData, 'register');

    console.log(isValid);
    if (!isValid) this.setState({ formError: true });
    else {
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then(response => {
          if (response.payload.success) {
            this.setState({ formError: false, formSuccess: true });

            setTimeout(() => {
              this.props.history.push('/register_login');
            }, 3000);
          } else {
            this.setState({ formError: true });
          }
        })
        .catch(err => {
          this.setState({ formError: true });
        });
    }
  };

  render() {
    return (
      <div className='page_wrapper'>
        <div className='container'>
          <div className='register_login_container'>
            <div className='left'>
              <form onSubmit={event => this.formSubmitHandler(event)}>
                <h2>Personal Information</h2>
                <div className='form_block_two'>
                  <div className='block'>
                    <FormField
                      id='firstname'
                      fieldData={this.state.formData.firstname}
                      changed={element => this.formUpdateHandler(element)}
                    />
                  </div>
                  <div className='block'>
                    <FormField
                      id='lastname'
                      fieldData={this.state.formData.lastname}
                      changed={element => this.formUpdateHandler(element)}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    id='email'
                    fieldData={this.state.formData.email}
                    changed={element => this.formUpdateHandler(element)}
                  />
                </div>
                <h2>Password Information</h2>
                <div className='form_block_two'>
                  <div className='block'>
                    <FormField
                      id='password'
                      fieldData={this.state.formData.password}
                      changed={element => this.formUpdateHandler(element)}
                    />
                  </div>
                  <div className='block'>
                    <FormField
                      id='confirmPassword'
                      fieldData={this.state.formData.confirmPassword}
                      changed={element => this.formUpdateHandler(element)}
                    />
                  </div>
                </div>
                <div>
                  {this.state.formError ? <div className='error_label'>Please check your data</div> : null}

                  <button onClick={event => this.formSubmitHandler(event)}>Create Account</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Dialog open={this.state.formSuccess}>
          <div className='dialog_alert'>
            <div>You have been registered!!!</div>
            <div>You will be redirected to the LOGIN page in a couple seconds...</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
