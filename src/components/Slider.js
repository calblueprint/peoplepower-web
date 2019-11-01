// Check out my free youtube video on how to build a thumbnail gallery in react
// https://www.youtube.com/watch?v=GZ4d3HEn9zg
import React from 'react';
import '../styles/Onboarding.css';
import Img1 from '../images/12.jpg';
import Img2 from '../images/89037.jpg';
import Img3 from '../images/city-dog-shiba_s.jpg';
import Img4 from '../images/NHS-Slider-03-1024x731.jpg';
import Img5 from '../images/sarah-wood-honeymoon.dog.beach-26-npcc.jpg';

export default class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [Img1, Img2, Img3, Img4, Img5],
      currentIndex: 0,
      translateValue: 0
    };
  }

  goToPrevSlide = () => {
    const { currentIndex } = this.state;
    if (currentIndex === 0) return;

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1,
      translateValue: prevState.translateValue + this.slideWidth()
    }));
  };

  goToNextSlide = () => {
    // Exiting the method early if we are at the end of the images array.
    // We also want to reset currentIndex and translateValue, so we return
    // to the first image in the array.
    const { currentIndex, images } = this.state;

    if (currentIndex === images.length - 1) {
      this.setState({
        currentIndex: 0,
        translateValue: 0
      });
    }

    // This will not run if we met the if condition above
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1,
      translateValue: prevState.translateValue + -this.slideWidth()
    }));
  };

  slideWidth = () => {
    return document.querySelector('.slide').clientWidth;
  };

  render() {
    const { images, translateValue } = this.state;

    return (
      <div className="slider">
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}px)`,
            transition: 'transform ease-out 0.45s'
          }}
        >
          {images.map(image => (
            <Slide image={image} />
          ))}
        </div>

        <LeftArrow goToPrevSlide={this.goToPrevSlide} />

        <RightArrow goToNextSlide={this.goToNextSlide} />
      </div>
    );
  }
}

const Slide = ({ image }) => {
  const styles = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 60%'
  };
  return <div className="slide" style={styles} />;
};

const LeftArrow = props => {
  const { goToPrevSlide } = props;
  return (
    <button type="button" className="backArrow arrow" onClick={goToPrevSlide}>
      <i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
    </button>
  );
};

const RightArrow = props => {
  const { goToNextSlide } = props;

  return (
    <button type="button" className="nextArrow arrow" onClick={goToNextSlide}>
      <i className="fa fa-arrow-right fa-2x" aria-hidden="true" />
    </button>
  );
};
