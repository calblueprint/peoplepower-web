import React from 'react';

const text = [
  'Tell us some general contact information so we can get started setting up your account.',
  'Project groups in People Power represent the different communities involved in our cooperative. ',
  '',
  ''
];

const header = [
  'Welcome Aboard!',
  'Select your project group',
  'Owner Agreement and Acknowledgment',
  'Purchase shares'
];

function Template(page, step) {
  return (
    <div className="template-center w-70">
      <div className="template-card">
        <h1 className="template-header">{header[step - 2]}</h1>
        <p className="template-body">{text[step - 2]}</p>
      </div>
      {page}
    </div>
  );
}

export default Template;
