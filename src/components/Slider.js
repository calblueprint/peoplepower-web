import React, { Component } from 'react';
import Arrow from '../images/Arrow.png';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  goToSlide(index) {
    this.setState({
      activeIndex: index
    });
  }

  goToPrevSlide(e) {
    e.preventDefault();

    const { activeIndex } = this.state;
    const { slides } = this.props;

    let index = activeIndex;

    if (index === 0) {
      index = slides.length - 1;
    } else {
      index -= 1;
    }

    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide(e) {
    e.preventDefault();
    const { activeIndex } = this.state;
    const { slides } = this.props;

    let index = activeIndex;
    const slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    } else {
      index = 0;
    }

    this.setState({
      activeIndex: index
    });
  }

  render() {
    const { slides } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="slider">
        <div className="progress-bar">
          <div
            className="filler"
            style={{ width: `${activeIndex === 0 ? 50 : 100}%` }}
          />
        </div>
        <div className="slider-padding">
          <input
            type="image"
            src={Arrow}
            className="arrow left-arrow"
            alt="previous button"
            onClick={this.goToPrevSlide}
          />
          <ul className="slides">
            {slides.map((slide, index) => (
              <img
                className={
                  index === activeIndex
                    ? 'center slide-img slide-img-active'
                    : 'center slide-img'
                }
                src={slides[activeIndex]}
                alt="This is the Owner Agreement"
              />
            ))}
          </ul>
          <input
            type="image"
            src={Arrow}
            className="arrow right-arrow"
            alt="next button"
            onClick={this.goToPrevSlide}
          />
        </div>
      </div>
    );
  }
}

export default Carousel;
