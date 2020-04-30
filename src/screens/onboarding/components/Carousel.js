import React, { Component } from 'react';
import Arrow from '../../../assets/arrow.png';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };
  }

  goToSlide = index => {
    this.setState({
      activeIndex: index
    });
  };

  goToPrevSlide = e => {
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
  };

  goToNextSlide = e => {
    e.preventDefault();
    const { activeIndex } = this.state;
    const { slides } = this.props;

    let index = activeIndex;
    const slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = 0;
    } else {
      index = 1;
    }

    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { slides } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="slider">
        <div className="progress-bar">
          {activeIndex === 0 ? (
            <div className="filler-50" />
          ) : (
            <div className="filler-100" />
          )}
        </div>
        <div className="slides">
          <div className="flex justify-space-between  slides-buttons">
            {activeIndex > 0 ? (
              <button
                type="button"
                className="arrow-block left"
                alt="prev button"
                onClick={this.goToPrevSlide}
              >
                <img
                  src={Arrow}
                  className="left-arrow"
                  alt="next button"
                  width=""
                  height=""
                />
              </button>
            ) : (
              <div className="left" />
            )}
            {activeIndex < slides.length - 1 ? (
              <button
                type="button"
                className="arrow-block right"
                alt="next button"
                onClick={this.goToNextSlide}
              >
                <img src={Arrow} className="right-arrow" alt="next button" />
              </button>
            ) : (
              <div className="right" />
            )}
          </div>
          <div className="w-100 flex justify-space-between ">
            {slides.map((slide, index) => (
              <img
                className={
                  index === activeIndex
                    ? ' slide-img slide-img-active'
                    : ' slide-img slide-img-inactive'
                }
                key={slide}
                src={slides[activeIndex]}
                alt="This is the Owner Agreement"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
