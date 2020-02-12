import React from 'react';
import OwnerAgreement1 from '../../../assets/ownerAgreement1.jpg';
import OwnerAgreement2 from '../../../assets/ownerAgreement2.jpg';
import Carousel from '../components/Carousel';

class BylawStep extends React.PureComponent {
  render() {
    const { owner, errors, onSubmit, onBack, handleChange } = this.props;

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
                  defaultChecked={owner.bylaw1}
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
                  defaultChecked={owner.bylaw2}
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
            <button type="button" className="back-button" onClick={onBack}>
              Go back
            </button>
          </div>
          <div className="right">
            <button
              type="button"
              className="btn btn--rounded btn--blue btn--size16 continue-button"
              onClick={onSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default BylawStep;
