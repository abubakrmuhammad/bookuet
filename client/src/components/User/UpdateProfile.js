import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../hoc/UserLayout';
import FormField from '../../utils/Form/FormField';
import { updateProfile, clearUpdateProfile } from '../../actions/user_actions';
import { update, generateData, isFormValid, populateFields } from '../../utils/Form/formActions';

class UpdateProfile extends Component {
  state = {
    formError: false,
    formSucces: false,
    formData: {
      firstname: {
        element: 'input',
        value: '',
        config: {
          label: 'Firstname',
          name: 'firstname',
          type: 'text',
          placeholder: 'Enter your First Name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          label: 'Lastname',
          name: 'lastname',
          type: 'text',
          placeholder: 'Enter your Last Name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Email',
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
        validationMessage: '',
        showLabel: true
      }
    }
  };

  componentDidMount() {
    const formData = populateFields(this.state.formData, this.props.user.userData);

    this.setState({ formData });
  }

  formUpdateHandler = element => {
    const newFormData = update(element, this.state.formData, 'update_user');

    this.setState({ formData: newFormData });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'update_user');
    let isValid = isFormValid(this.state.formData, 'update_user');

    console.log(isValid);
    if (!isValid) this.setState({ formError: true });
    else {
      this.props.dispatch(updateProfile(dataToSubmit)).then(() => {
        if (this.props.user.updateProfile.success)
          this.setState({ formSuccess: true }, () =>
            setTimeout(() => {
              this.props.dispatch(clearUpdateProfile());
              this.setState({ formSuccess: false });
            }, 3000)
          );
      });
    }
  };

  render() {
    return (
      <UserLayout>
        <h1>Profile</h1>
        <div>
          <form onSubmit={this.formSubmitHandler}>
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
            {this.state.formSuccess ? <div className='form_success'>Information successfully updated</div> : null}
            {this.state.formError ? <div className='error_label'>Please check your data</div> : null}
            <button onClick={this.formSubmitHandler}>Update Profiile</button>
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UpdateProfile);
