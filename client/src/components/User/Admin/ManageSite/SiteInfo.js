import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormField from '../../../../utils/Form/FormField';
import { getSiteInfo, updateSiteInfo } from '../../../../actions/site_actions';
import { update, generateData, isFormValid, populateFields } from '../../../../utils/Form/formActions';

class SiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: 'input',
        value: '',
        config: {
          name: 'address',
          type: 'text',
          label: 'Address',
          placeholder: 'Enter Address'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          name: 'hours',
          type: 'text',
          label: 'Working Hours',
          placeholder: 'Enter Working Hours'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          placeholder: 'Enter Phone Number'
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
    this.props.dispatch(getSiteInfo()).then(() => {
      const formData = populateFields(this.state.formData, this.props.site.siteInfo);

      this.setState({ formData });
    });
  }

  formUpdateHandler = element => {
    const newFormData = update(element, this.state.formData, 'site_info');

    this.setState({ formData: newFormData });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'site_info');
    let isValid = isFormValid(this.state.formData, 'site_info');

    if (!isValid) this.setState({ formError: true });
    else {
      this.props.dispatch(updateSiteInfo(dataToSubmit)).then(() => {
        this.setState({ formSuccess: true }, () => {
          setTimeout(() => this.setState({ formSuccess: false }), 3000);
        });
      });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmitHandler}>
          <h1>Site Info</h1>

          <FormField
            id='address'
            fieldData={this.state.formData.address}
            changed={element => this.formUpdateHandler(element)}
          />
          <FormField
            id='phone'
            fieldData={this.state.formData.phone}
            changed={element => this.formUpdateHandler(element)}
          />
          <FormField
            id='hours'
            fieldData={this.state.formData.hours}
            changed={element => this.formUpdateHandler(element)}
          />
          <FormField
            id='email'
            fieldData={this.state.formData.email}
            changed={element => this.formUpdateHandler(element)}
          />

          {this.state.formSuccess ? <div className='form_success'>Information successfully updated</div> : null}
          {this.state.formError ? <div className='error_label'>Please check your data</div> : null}
          <button onClick={this.formSubmitHandler}>Update Site Info</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site
  };
};

export default connect(mapStateToProps)(SiteInfo);
