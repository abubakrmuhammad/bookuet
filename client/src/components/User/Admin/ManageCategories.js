import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';
import UserLayout from '../../../hoc/UserLayout';
import FormField from '../../../utils/Form/FormField';
import { update, generateData, isFormValid, resetFields } from '../../../utils/Form/formActions';
import { getCategories, addCategory, removeCategory } from '../../../actions/books_actions';

class ManageCategories extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Enter Category'
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

  componentDidMount() {
    this.props.dispatch(getCategories());
  }

  renderCategories = () => {
    if (this.props.books.categories)
      return this.props.books.categories.map(item => (
        <div className='category_item' key={item._id}>
          {item.name}
          <span className='remove_category'>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => this.props.dispatch(removeCategory(item)).then(() => this.props.dispatch(getCategories()))}
            />
          </span>
        </div>
      ));
  };

  formDataUpdateHandler = formData => this.setState(formData);

  formUpdateHandler = element => {
    const newFormData = update(element, this.state.formData, 'category');

    this.setState({ formData: newFormData });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const dataToSubmit = generateData(this.state.formData, 'category');
    const isValid = isFormValid(this.state.formData, 'category');
    const existingCategories = [...this.props.books.categories];

    if (!isValid) this.setState({ formError: true });
    else {
      this.setState({ formError: false });
      this.props.dispatch(addCategory(dataToSubmit, existingCategories)).then(() => this.formResetHandler());
    }
  };

  formResetHandler = () => {
    const formData = resetFields(this.state.formData, 'category');

    this.setState({ formData, formSuccess: true });
  };

  render() {
    return (
      <UserLayout>
        <div className='admin_category_wrapper'>
          <h1>Categories</h1>
          <div className='admin_two_column'>
            <div className='left'>
              <div className='brands_container'>{this.renderCategories(this.renderCategories())}</div>
            </div>
            <div className='right'>
              <form onSubmit={this.formSubmitHandler}>
                <FormField id='name' fieldData={this.state.formData.name} changed={this.formUpdateHandler} />
                {this.state.formError ? <div className='error_label'>Please check your data</div> : null}
                <button onClick={this.formSubmitHandler}>Add Category</button>
              </form>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(ManageCategories);
