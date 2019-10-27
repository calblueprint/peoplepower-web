import React from 'react';

class Bylaws extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nextButton = e => {
    const { values, callBackBylawValidation, nextStep } = this.props;
    const { bylaw } = values;
    e.preventDefault();
    if (!bylaw) {
      callBackBylawValidation();
    } else {
      nextStep();
    }
  };

  prevButton = e => {
    const { prevStep } = this.props;
    e.preventDefault();
    prevStep();
  };

  render() {
    const { values, handleClick } = this.props;
    const { errors, bylaw } = values;
    return (
      <form>
        <div>
          <input
            type="checkbox"
            name="bylaw"
            onChange={handleClick}
            checked={bylaw}
          />
          Agree
          {!values.bylaw && <div>{errors.bylaw}</div>}
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
