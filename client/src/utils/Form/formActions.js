export const validate = (fieldData, formData) => {
  let valid = [true, ''];

  if (fieldData.validation.email) {
    const isValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(fieldData.value);
    const message = !isValid ? 'Must be a valid email' : '';
    valid = !isValid ? [isValid, message] : valid;
  }

  if (fieldData.validation.confirm) {
    const isValid = fieldData.value === formData[fieldData.validation.confirm].value;
    const message = !isValid ? 'Passwords do not match' : '';

    valid = !isValid ? [isValid, message] : valid;
  }

  if (fieldData.validation.minLength) {
    const isValid = fieldData.value.length >= fieldData.validation.minLength;
    const message = !isValid ? 'Password should be atleast 8 characters long' : '';

    valid = !isValid ? [isValid, message] : valid;
  }

  if (fieldData.validation.required) {
    const isValid = fieldData.value.trim() !== '';
    const message = !isValid ? 'This field is required' : '';

    valid = !isValid ? [isValid, message] : valid;
  }

  return valid;
};

export const update = (element, formData, formName) => {
  const data = { ...formData };
  const fieldData = { ...data[element.id] };

  fieldData.value = element.event.target.value;

  // if (element.blur) {
  let [isValid, message] = validate(fieldData, data);

  fieldData.valid = isValid;
  fieldData.validationMessage = message;
  // }

  fieldData.touched = element.blur;

  data[element.id] = fieldData;

  return data;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    if (key !== 'confirmPassword') {
      dataToSubmit[key] = formData[key].value;
    }
  }

  return dataToSubmit;
};

export const isFormValid = (formData, formName) => {
  let isValid = true;

  for (let key in formData) {
    isValid = formData[key].valid && isValid;
  }

  return isValid;
};

export const populateOptions = (formData, options, fieldName) => {
  const newOptions = [];
  const newFormData = { ...formData };

  options.forEach(item => newOptions.push({ key: item._id, value: item.name }));

  newFormData[fieldName].config.options = newOptions;

  return newFormData;
};

export const resetFields = (formData, formName) => {
  const newFormData = { ...formData };

  for (let key in newFormData) {
    newFormData[key].value = key === 'images' ? [] : '';
    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = '';
  }

  return newFormData;
};

export const populateFields = (formData, userData) => {
  const newFormData = { ...formData };

  for (let key in newFormData) {
    newFormData[key].value = userData[key];
    newFormData[key].valid = true;
    newFormData[key].touched = true;
    newFormData[key].validationMessage = '';
  }

  return newFormData;
};
