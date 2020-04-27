/* eslint-disable class-methods-use-this */
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup
} from 'react-transition-group';
import { connect } from 'react-redux';
import '../styles/Equivalencies.css';
import createProductionChart from '../lib/charts/createProductionChart';
import CarIcon from '../assets/Car-Icon-Square.png';
import TrashIcon from '../assets/Trash-Icon-Square.png';
import CoalIcon from '../assets/Coal-Icon-Square.png';
import calculateSolarProjectProduction from '../lib/solarProjectUtils';

const colors = ['pink', 'green', 'yellow'];

class ProductionEquivalenciesChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equivalencyIndex: 0,
      style: !props.subscriberVersion ? '' : '-sub',
      data: calculateSolarProjectProduction(props.solarProjects)
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

  renderEquivalencyOne = () => {
    const { style } = this.state;
    return (
      <div className={`prod-equivalencies-right-inner${style}`}>
        <div className={`prod-equivalencies-text${style}`}>
          reducing greenhouse gas emissions from
          <div className="prod-equivalencies-amt">2,172</div>
          miles driven by an average vehicle
        </div>
        <img className="prod-equivalencies-icon" src={CarIcon} alt="car" />
      </div>
    );
  };

  renderEquivalencyTwo = () => {
    const { style } = this.state;
    return (
      <div className={`prod-equivalencies-right-inner${style}`}>
        <div className={`prod-equivalencies-text${style}`}>
          greenhouse gas emissions avoided by
          <div className="prod-equivalencies-amt">4</div>
          wind turbines running for a year
        </div>
        <img
          className="prod-equivalencies-icon"
          src={CoalIcon}
          alt="windmill"
        />
      </div>
    );
  };

  renderEquivalencyThree = () => {
    const { style } = this.state;
    return (
      <div className={`prod-equivalencies-right-inner${style}`}>
        <div className={`prod-equivalencies-text${style}`}>
          greenhouse gas emissions avoided by
          <div className="prod-equivalencies-amt">38.8</div>
          bags of waste recycled instead of landfilled
        </div>
        <img className="prod-equivalencies-icon" src={TrashIcon} alt="fruit" />
      </div>
    );
  };

  renderEquivalency() {
    const { equivalencyIndex, style } = this.state;

    const equivalencies = [
      this.renderEquivalencyOne,
      this.renderEquivalencyTwo,
      this.renderEquivalencyThree
    ];
    return (
      <div
        className={`prod-equivalencies-right${style} prod-equivalencies-${colors[equivalencyIndex]}`}
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
    const { subscriberVersion } = this.props;
    const { data, style } = this.state;
    const equivalency = this.renderEquivalency();

    return (
      <div className="prod-chart-container">
        <h3>Production</h3>
        <div className={`prod-chart-container-inner${style}`}>
          <div style={{ width: '100%' }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={createProductionChart(
                data,
                !subscriberVersion ? 250 : 300
              )}
            />
          </div>
          <div className={`prod-equivalencies-container${style}`}>
            <div className="prod-equivalencies-left">
              You've helped generate a total of
              <br />
              <div className="prod-equivalencies-amt-energy">
                <div className="prod-equivalencies-amt-energy-num">1,256</div>
                kWH
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  solarProjects: state.userData.solarProjects
});

export default connect(mapStateToProps)(ProductionEquivalenciesChart);
