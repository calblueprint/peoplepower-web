import React from 'react';
import OwnerAgreement1 from '../../images/ownerAgreement1.jpg';
import OwnerAgreement2 from '../../images/ownerAgreement2.jpg';
import Slider from '../../components/Slider';
import formValidation from '../../lib/formValidation';

class Bylaws extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nextButton = e => {
    e.preventDefault();
    const { values, nextStep } = this.props;
    const { errors } = values;
    const fields = ['bylaw1', 'bylaw1'];
    const errorsMessages = [];

    for (let i = 0; i < fields.length; i += 1) {
      const errorMessage = formValidation(fields[i], values[fields[i]]);
      errors[fields[i]] = errorMessage;
      if (errorMessage !== '') {
        errorsMessages.push(errorMessage);
      }
    }

    if (!(errorsMessages && errorsMessages.length > 0)) {
      nextStep();
    } else {
      this.forceUpdate();
    }
  };

  prevButton = e => {
    const { prevStep } = this.props;
    e.preventDefault();
    prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const { errors, bylaw1, bylaw2 } = values;
    const imgs = [OwnerAgreement1, OwnerAgreement2];
    return (
      <form className="center">
        <div>
          <div className="contact-header">Onboarding Agrement</div>
          <Slider slides={imgs} />
          <div className="flex">
            <input
              type="checkbox"
              name="bylaw1"
              onChange={handleChange}
              checked={bylaw1}
            />
            <div className="checkbox-text">
              I have read, understood, and agree to all that stuff above,
              especially the part about how being an Owner and investing into
              things comes with risks!
            </div>
          </div>
          {!values.bylaw1 && <div>{errors.bylaw1}</div>}
          <div className="flex">
            <input
              type="checkbox"
              name="bylaw2"
              onChange={handleChange}
              checked={bylaw2}
            />
            <div className="checkbox-text">
              I have read the{' '}
              <a
                href="https://d3n8a8pro7vhmx.cloudfront.net/peoplepowersolar/pages/22/attachments/original/1554318079/small_331amended_peoplepowerbylaws_compressed.pdf?1554318079"
                rel="noopener noreferrer"
                target="_blank"
              >
                Bylaws
              </a>{' '}
              for People Power Solar Cooperative, Inc. and agree to the terms of
              being an Owner.
            </div>
          </div>
          {!values.bylaw2 && <div>{errors.bylaw2}</div>}
        </div>
        <button type="button" onClick={this.prevButton}>
          Prev
        </button>
        <button type="button" onClick={this.nextButton}>
          Next
        </button>
      </form>
    );
  }
}

export default Bylaws;
