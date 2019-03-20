import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../hoc/UserLayout';
import FormField from '../../../utils/Form/FormField';
import FileUpload from '../../../utils/Form/FileUpload.js';
import { getCategories, addBook, clearBook } from '../../../actions/books_actions';
import { populateOptions, update, generateData, isFormValid, resetFields } from '../../../utils/Form/formActions';

class AddBook extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      title: {
        element: 'input',
        value: '',
        config: {
          label: 'Book Title',
          name: 'title',
          type: 'text',
          placeholder: 'Enter Book Title'
        },
        validation: { required: true },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      author: {
        element: 'input',
        value: '',
        config: {
          label: 'Author Name',
          name: 'author',
          type: 'text',
          placeholder: 'Enter Author Name'
        },
        validation: { required: true },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Book Description',
          name: 'description',
          type: 'text',
          placeholder: 'Enter Book Description'
        },
        validation: { required: true },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Book Price',
          name: 'price',
          type: 'number',
          placeholder: 'Enter Book Price'
        },
        validation: { required: true },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      category: {
        element: 'select',
        value: '',
        config: {
          label: 'Book Category',
          name: 'category',
          options: []
        },
        validation: { required: true },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping',
          options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
        },
        validation: { required: true },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available, In Stock',
          name: 'available',
          options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
        },
        validation: { required: true },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish',
          options: [{ key: true, value: 'Public' }, { key: false, value: 'Hidden' }]
        },
        validation: { required: true },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: ''
      }
    }
  };

  componentDidMount() {
    const formData = { ...this.state.formData };

    this.props.dispatch(getCategories()).then(() => {
      const newFormData = populateOptions(formData, this.props.books.categories, 'category');

      this.formDataUpdateHandler(newFormData);
    });
  }

  formDataUpdateHandler = formData => this.setState(formData);

  formUpdateHandler = element => {
    const newFormData = update(element, this.state.formData, 'books');

    this.setState({ formData: newFormData });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'books');
    let isValid = isFormValid(this.state.formData, 'books');

    if (!isValid) this.setState({ formError: true });
    else {
      this.props.dispatch(addBook(dataToSubmit)).then(() => {
        if (this.props.books.addBook.success) this.formResetHandler();
        else this.setState({ formError: true });
      });
    }
  };

  formResetHandler = () => {
    const formData = resetFields(this.state.formData, 'books');

    this.setState({ formData, formSuccess: true });

    setTimeout(() => this.setState({ formSuccess: false }, () => this.props.dispatch(clearBook())), 3000);
  };

  imagesHandler = images => {
    const formData = { ...this.state.formData };
    formData.images.value = images;
    formData.images.valid = true;

    this.setState({ formData });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Book</h1>
          <form onSubmit={event => this.formSubmitHandler(event)}>
            <FileUpload imagesHandler={images => this.imagesHandler(images)} reset={this.state.formSuccess} />
            <FormField
              id='title'
              fieldData={this.state.formData.title}
              changed={element => this.formUpdateHandler(element)}
            />
            <FormField
              id='author'
              fieldData={this.state.formData.author}
              changed={element => this.formUpdateHandler(element)}
            />
            <FormField
              id='description'
              fieldData={this.state.formData.description}
              changed={element => this.formUpdateHandler(element)}
            />
            <FormField
              id='price'
              fieldData={this.state.formData.price}
              changed={element => this.formUpdateHandler(element)}
            />
            <div className='form_devider' />
            <FormField
              id='category'
              fieldData={this.state.formData.category}
              changed={element => this.formUpdateHandler(element)}
            />
            <FormField
              id='shipping'
              fieldData={this.state.formData.shipping}
              changed={element => this.formUpdateHandler(element)}
            />
            <FormField
              id='available'
              fieldData={this.state.formData.available}
              changed={element => this.formUpdateHandler(element)}
            />
            <div className='form_devider' />
            <FormField
              id='publish'
              fieldData={this.state.formData.publish}
              changed={element => this.formUpdateHandler(element)}
            />
            {this.state.formSuccess ? <div className='form_success'>Book has been successfully added.</div> : null}
            {this.state.formError ? <div className='error_label'>Please check your data</div> : null}
            <button onClick={event => this.formSubmitHandler(event)}>Add Book</button>
          </form>
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

export default connect(mapStateToProps)(AddBook);
