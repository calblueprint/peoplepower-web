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
import moment from 'moment';
import '../styles/Equivalencies.css';
import createProductionChart from '../lib/charts/productionChart';
import Car from '../assets/Car-Icon-Square.png';
import Trash from '../assets/Trash-Icon-Square.png';
import Coal from '../assets/Coal-Icon-Square.png';

const colors = ['pink', 'green', 'yellow'];

class ProductionChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equivalencyIndex: 0
    };
    this.style = !props.subscriberVersion ? '' : '-sub';
    this.data = this.calculateSolarProjectProduction(props.solarProjects);
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

  calculateSolarProjectProduction(solarProjects) {
    // Combine Solar Project Production Data
    const productionDataObject = solarProjects.reduce((d, project) => {
      let { monthlyProductionData } = project;
      if (!monthlyProductionData) {
        return { ...d };
      }
      monthlyProductionData = JSON.parse(monthlyProductionData);
      return Object.keys(monthlyProductionData).reduce(
        (prev, date) => {
          return {
            ...prev,
            [date]: (prev[date] || 0) + monthlyProductionData[date]
          };
        },
        { ...d }
      );
    }, {});
    // Sort Production Data by month and convert to data format for chart
    return Object.keys(productionDataObject)
      .map(date => [moment(date, 'MM/YYY'), productionDataObject[date]])
      .sort((a, b) => a[0] - b[0])
      .reduce(
        (dataSoFar, date) => [
          ...dataSoFar,
          { month: date[0].format('MMM'), production: date[1] }
        ],
        []
      );
  }

  renderEquivalencyOne = () => (
    <div className={`prod-equivalencies-right-inner${this.style}`}>
      <div className={`prod-equivalencies-text${this.style}`}>
        reducing greenhouse gas emissions from
        <div className="prod-equivalencies-amt">2,172</div>
        miles driven by an average vehicle
      </div>
      <img className="prod-equivalencies-icon" src={Car} alt="car" />
    </div>
  );

  renderEquivalencyTwo = () => (
    <div className={`prod-equivalencies-right-inner${this.style}`}>
      <div className={`prod-equivalencies-text${this.style}`}>
        greenhouse gas emissions avoided by
        <div className="prod-equivalencies-amt">4</div>
        wind turbines running for a year
      </div>
      <img className="prod-equivalencies-icon" src={Coal} alt="windmill" />
    </div>
  );

  renderEquivalencyThree = () => (
    <div className={`prod-equivalencies-right-inner${this.style}`}>
      <div className={`prod-equivalencies-text${this.style}`}>
        greenhouse gas emissions avoided by
        <div className="prod-equivalencies-amt">38.8</div>
        bags of waste recycled instead of landfilled
      </div>
      <img className="prod-equivalencies-icon" src={Trash} alt="fruit" />
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
        className={`prod-equivalencies-right${this.style} prod-equivalencies-${colors[equivalencyIndex]}`}
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
    const equivalency = this.renderEquivalency();

    return (
      <div className="prod-chart-container">
        <h3>Production</h3>
        <div className={`prod-chart-container-inner${this.style}`}>
          <div style={{ width: '100%' }}>
            <HighchartsReact
              highcharts={Highcharts}
              options={createProductionChart(
                this.data,
                !subscriberVersion ? 250 : 300
              )}
            />
          </div>
          <div className={`prod-equivalencies-container${this.style}`}>
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

export default connect(mapStateToProps)(ProductionChart);
