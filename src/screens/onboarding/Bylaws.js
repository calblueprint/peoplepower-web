import React from 'react';
import OwnerAgreement1 from '../../assets/ownerAgreement1.jpg';
import OwnerAgreement2 from '../../assets/ownerAgreement2.jpg';
import Carousel from '../../components/Carousel';
import formValidation from '../../lib/onboarding/formValidation';
import { updatePerson } from '../../lib/airtable/request';

class Bylaws extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nextButton = e => {
    e.preventDefault();
    const { values, nextStep } = this.props;
    const { errors, userId } = values;
    const inputTypes = ['bylaw1', 'bylaw2'];
    const errorsMessages = [];

    for (let i = 0; i < inputTypes.length; i += 1) {
      const errorMessage = formValidation(inputTypes[i], values[inputTypes[i]]);
      errors[inputTypes[i]] = errorMessage;
      if (errorMessage !== '') {
        errorsMessages.push(errorMessage);
      }
    }

    if (!(errorsMessages && errorsMessages.length > 0)) {
      const updatedPerson = {
        onboardingStep: 5
      };
      updatePerson(userId, updatedPerson);
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
      <form className="">
        <div>
          <Carousel slides={imgs} />
          <div className="template-bylaws-card">
            <div style={{ display: 'inline', position: 'relative' }}>
              <label className="checkbox-container">
                I have read, understood, and agree to all that stuff above,
                especially the part about how being an Owner and investing into
                things comes with risks!
                <input
                  type="checkbox"
                  name="bylaw1"
                  onChange={handleChange}
                  checked={bylaw1}
                />
                <span className="checkmark" />
              </label>
            </div>
            <div className=" validation">
              {errors.bylaw1 ? errors.bylaw1 : '\u00A0'}
            </div>
            <div style={{ display: 'inline', position: 'relative' }}>
              <label className="checkbox-container">
                <div className="checkbox-text">
                  I have read the{' '}
                  <a
                    href="https://d3n8a8pro7vhmx.cloudfront.net/peoplepowersolar/pages/22/attachments/original/1554318079/small_331amended_peoplepowerbylaws_compressed.pdf?1554318079"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="bylaws-hyperlink"
                  >
                    Bylaws for People Power Solar Cooperative, Inc.
                  </a>{' '}
                  and agree to the terms of being an Owner.
                </div>
                <input
                  type="checkbox"
                  name="bylaw2"
                  onChange={handleChange}
                  checked={bylaw2}
                />
                <span className="checkmark" />
              </label>
            </div>
            <div className=" validation">
              {errors.bylaw2 ? errors.bylaw2 : '\u00A0'}
            </div>
          </div>
        </div>
        <div className="steps-buttons flex onboarding-row w-100 right justify-space-between">
          <div className="left">
            <button
              type="button"
              className="back-button"
              onClick={this.prevButton}
            >
              Go back
            </button>
          </div>
          <div className="right">
            <button
              type="button"
              className="btn btn--rounded btn--blue btn--size16 continue-button"
              onClick={this.nextButton}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Bylaws;
