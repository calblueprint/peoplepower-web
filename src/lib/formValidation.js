import States from './states';

function formValidation(name, value) {
  const num = Number(value);
  switch (name) {
    case 'email':
    case 'altEmail':
      if (value === '') {
        return 'Required';
      }
      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
        return 'Invalid Email';
      }
      return '';
    case 'bylaw1':
    case 'bylaw2':
      console.log('checking');
      if (!value) {
        return 'Required';
      }
      return '';
    case 'projectGroup':
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
