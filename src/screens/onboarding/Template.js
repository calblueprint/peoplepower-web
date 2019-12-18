import React from 'react';
import ProgressBar from '../../components/progressbar';

const text = [
  'Tell us some general contact information so we can get started setting up your account.',
  'Project groups in People Power represent the different communities involved in our cooperative. ',
  '',
  '',
  'Hooray! We made it.'
];

const header = [
  'Welcome Aboard!',
  'Select your project group',
  'Owner Agreement and Acknowledgment',
  'Purchase shares',
  'Registration complete!'
];

function Template(page, step) {
  return (
    <div className="flex onboarding-col template-center w-70">
      <div className="template-card">
        <h1 className="template-header">{header[step - 2]}</h1>
        <p className="template-body">{text[step - 2]}</p>
        {ProgressBar(step)}
      </div>
      {page}
    </div>
  );
}

export default Template;
