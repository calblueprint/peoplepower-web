import States from '../../assets/states.json';

function formValidation(name, value) {
  const num = Number(value);
  switch (name) {
    case 'password':
      if (value === '') {
        return 'Required';
      }

      if (value.length < 6) {
        return 'Must be at least 6 characters';
      }
      return '';
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
      if (!value) {
        return 'Required';
      }
      return '';
    case 'projectGroup':
      if (value === '') {
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
    case 'mailingZipcode':
    case 'billingZipcode':
      if (value === undefined) {
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
    case 'mailingState':
    case 'billingState':
      if (value === undefined) {
        return 'Required';
      }

      if (
        States.map(s => s.toUpperCase()).indexOf(value.toUpperCase()) !== -1
      ) {
        return '';
      }

      return 'Invalid State';
    case 'apt':
    case 'mailingApt':
    case 'billingApt':
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
