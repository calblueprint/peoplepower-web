import States from './states';

function formValidation(name, value) {
  const num = Number(value);
  switch (name) {
    case 'bylaw':
      if (!value) {
        return 'Required';
      }
      return '';
    case 'project_group':
      if (value === '') {
        return 'Please choose a group';
      }
      return '';
    case 'dividends':
      if (value === '') {
        return 'Please pick one';
      }
      return '';
    case 'num_shares':
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
      if (Object.prototype.hasOwnProperty.call(States, value)) {
        return '';
      }
      for (let index = 0; index < States.length; index += 1) {
        const state = States[index];
        if (state === value) {
          return '';
        }
      }
      return 'Invalid State';
    default:
      if (value.length === 0) {
        return 'Required';
      }
      return '';
  }
}
export default formValidation;
