import React from 'react';
import Img1 from '../../images/12.jpg';
import Img2 from '../../images/89037.jpg';
import Img3 from '../../images/city-dog-shiba_s.jpg';
import Img4 from '../../images/NHS-Slider-03-1024x731.jpg';
import Img5 from '../../images/sarah-wood-honeymoon.dog.beach-26-npcc.jpg';
import Slider from '../../components/Slider';

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
    const imgs = [Img1, Img2, Img3, Img4, Img5];
    return (
      <form>
        <div>
          <Slider images={imgs} />
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
