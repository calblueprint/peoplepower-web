import States from './states';

function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  return true;
}

function formValidation(name, value) {
  const num = Number(value);
  switch (name) {
    case 'bylaw':
      if (!value) {
        return 'Required';
      }
      return '';
    case 'projectGroup':
      console.log(isEmpty(value));
      console.log(value);
      // if (isEmpty(value)) {
      //   return 'Please choose a group';
      // }
      if (typeof value.name === 'undefined') {
        return 'Please choose a group';
      }
      return '';
    case 'dividends':
      if (value === '') {
        return 'Please pick one';
      }
      return '';
    case 'numShares':
      if (Number.isNaN(num)) {
        return 'Must be a number';
      }
      if (num > 10) {
        return 'Max number of shares is 10';
      }
      if (num < 0) {
        return 'Min number of shares is 0';
      }
      if (num === 0 && value === '') {
        return 'Required';
      }
      return '';
    case 'zipcode':
      if (value === '') {
        return 'Required';
      }
      if (Number.isNaN(num)) {
        return 'Must be a number';
      }
      if (value.length !== 5) {
        return 'Invalid';
      }
      if (num === 0 && value === '') {
        return 'Required';
      }
      return '';
    case 'state':
      if (value === '') {
        return 'Required';
      }
      if (Object.prototype.hasOwnProperty.call(States, value.toUpperCase())) {
        return '';
      }
      for (let index = 0; index < States.length; index += 1) {
        const state = States[index];
        if (state === value) {
          return '';
        }
      }
      return 'Invalid State';
    case 'apt':
      return '';
    default:
      if (value === undefined) {
        return 'Required';
      }
      if (value.length === 0) {
        return 'Required';
      }
      return '';
  }
}
export default formValidation;
