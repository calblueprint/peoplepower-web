import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup
} from 'react-transition-group';
import '../styles/Equivalencies.css';
import createProductionChart from '../lib/charts/productionChart';
import Car from '../assets/car.png';
import Fruit from '../assets/fruit.png';
import Windmill from '../assets/windmill.png';

const colors = ['pink', 'green', 'yellow'];

class ProductionChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equivalencyIndex: 0
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState(prevState => ({
          equivalencyIndex: (prevState.equivalencyIndex + 1) % 3
        })),
      3000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderEquivalencyOne = () => (
    <div className="prod-equivalencies-right-inner">
      <div className="prod-equivalencies-text">
        reducing greenhouse gas emissions from
        <div className="prod-equivalencies-amt">2,172</div>
        miles driven by an average vehicle
      </div>
      <img className="prod-equivalencies-icon" src={Car} alt="car" />
    </div>
  );

  renderEquivalencyTwo = () => (
    <div className="prod-equivalencies-right-inner">
      <div className="prod-equivalencies-text">
        greenhouse gas emissions avoided by
        <div className="prod-equivalencies-amt">4</div>
        wind turbines running for a year
      </div>
      <img className="prod-equivalencies-icon" src={Windmill} alt="windmill" />
    </div>
  );

  renderEquivalencyThree = () => (
    <div className="prod-equivalencies-right-inner">
      <div className="prod-equivalencies-text">
        greenhouse gas emissions avoided by
        <div className="prod-equivalencies-amt">38.8</div>
        bags of waste recycled instead of landfilled
      </div>
      <img className="prod-equivalencies-icon" src={Fruit} alt="fruit" />
    </div>
  );

  renderEquivalency() {
    const { equivalencyIndex } = this.state;
    const equivalencies = [
      this.renderEquivalencyOne,
      this.renderEquivalencyTwo,
      this.renderEquivalencyThree
    ];
    return (
      <div
        className={`prod-equivalencies-right prod-equivalencies-${colors[equivalencyIndex]}`}
      >
        <SwitchTransition>
          <CSSTransition
            key={equivalencyIndex}
            classNames="fade"
            timeout={{ enter: 300, exit: 300 }}
          >
            {equivalencies[equivalencyIndex]}
          </CSSTransition>
        </SwitchTransition>
      </div>
    );
  }

  render() {
    const { data } = this.props;
    const equivalency = this.renderEquivalency();
    return (
      <div>
        <h3>Production</h3>
        <HighchartsReact
          highcharts={Highcharts}
          options={createProductionChart(data)}
        />
        <div className="prod-equivalencies-container">
          <div className="prod-equivalencies-left">
            You've helped generate a total of
            <br />
            <div className="prod-equivalencies-amt-energy">
              <div className="prod-equivalencies-amt-energy-num">1,256</div>kWH
            </div>
            <br />
            equivalent to
          </div>
          <TransitionGroup
            transitionName="productionAnimation"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {equivalency}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default ProductionChart;
