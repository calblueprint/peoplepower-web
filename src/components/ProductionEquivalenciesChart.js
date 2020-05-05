/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup
} from 'react-transition-group';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import '../styles/Equivalencies.css';
import EmptyStateGraph from '../assets/empty-state-graph.png';
import createProductionChart from '../lib/highcharts/createProductionChart';
import CarIcon from '../assets/Car-Icon-Square.png';
import TrashIcon from '../assets/Trash-Icon-Square.png';
import CoalIcon from '../assets/Coal-Icon-Square.png';
import calculateSolarProjectProduction from '../lib/solarProjectUtils';
import Constants from '../constants';

const { KWH_TO_COAL, KWH_TO_VEHICLE_MILES, KWH_TO_TRASH_BAGS } = Constants;

const COLORS = ['pink', 'green', 'yellow'];
const formatEnergy = value => Number(Math.floor(value)).toLocaleString();

class ProductionEquivalenciesChart extends React.Component {
  constructor(props) {
    super(props);
    const { data, totalEnergy } = calculateSolarProjectProduction(
      props.solarProjects
    );

    this.state = {
      equivalencyIndex: 0,
      style: !props.subscriberVersion ? '' : '-sub',
      data,
      totalEnergy
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
    const { style, totalEnergy } = this.state;
    return (
      <div className={`prod-equivalencies-right-inner${style}`}>
        <div className={`prod-equivalencies-text${style}`}>
          reducing greenhouse gas emissions from
          <div className="prod-equivalencies-amt">
            {formatEnergy(KWH_TO_VEHICLE_MILES(totalEnergy))}
          </div>
          miles driven by an average vehicle
        </div>
        <img className="prod-equivalencies-icon" src={CarIcon} alt="car" />
      </div>
    );
  };

  renderEquivalencyTwo = () => {
    const { style, totalEnergy } = this.state;
    return (
      <div className={`prod-equivalencies-right-inner${style}`}>
        <div className={`prod-equivalencies-text${style}`}>
          greenhouse gas emissions avoided by
          <div className="prod-equivalencies-amt">
            {formatEnergy(KWH_TO_COAL(totalEnergy))}
          </div>
          pounds of coal burned
        </div>
        <img className="prod-equivalencies-icon" src={CoalIcon} alt="coal" />
      </div>
    );
  };

  renderEquivalencyThree = () => {
    const { style, totalEnergy } = this.state;
    return (
      <div className={`prod-equivalencies-right-inner${style}`}>
        <div className={`prod-equivalencies-text${style}`}>
          greenhouse gas emissions avoided by
          <div className="prod-equivalencies-amt">
            {formatEnergy(KWH_TO_TRASH_BAGS(totalEnergy))}
          </div>
          bags of waste recycled instead of landfilled
        </div>
        <img className="prod-equivalencies-icon" src={TrashIcon} alt="trash" />
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
        className={`prod-equivalencies-right${style} prod-equivalencies-${COLORS[equivalencyIndex]}`}
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
    const { data, style, totalEnergy } = this.state;
    const equivalency = this.renderEquivalency();

    // If the data is empty or if the only value is 0, don't render
    const dataIsEmpty =
      data.length === 0 || (data.length === 1 && data[0].production === 0);
    if (dataIsEmpty) {
      return (
        <div className="prod-chart-empty-container">
          <img
            className="prod-chart-empty-img"
            src={EmptyStateGraph}
            alt="No Production Data"
          />
          <div className="prod-chart-empty-title">No Data Available</div>

          <div className="prod-chart-empty-detail">
            Looks like there’s no data available about your solar projects yet.
            Check back later!
          </div>
        </div>
      );
    }

    // Remove 0 value from end of array if it exists
    const adjustedData =
      data[data.length - 1].production === 0
        ? data.slice(0, data.length - 1)
        : [...data];

    return (
      <div className="prod-chart-container">
        <h3>Production</h3>
        <div className={`prod-chart-container-inner${style}`}>
          <div style={{ width: '100%' }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={createProductionChart(
                adjustedData,
                !subscriberVersion ? 250 : 300
              )}
            />
          </div>
          <div className={`prod-equivalencies-container${style}`}>
            <div className="prod-equivalencies-left">
              You've helped generate a total of
              <br />
              <div className="prod-equivalencies-amt-energy">
                <div className="prod-equivalencies-amt-energy-num">
                  {formatEnergy(totalEnergy)}
                </div>
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
