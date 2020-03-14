import React from 'react';

export default class DashboardChartsSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
    this.switchChartView = this.switchChartView.bind(this);
  }

  // need to make sure the value doesnt switch if its the same button
  switchChartView = e => {
    const { activeTab } = this.state;
    const { hasShares } = this.props;
    if (e.target.value != 0 && activeTab === 0 && hasShares) {
      this.setState({
        activeTab: 1
      });
    } else if (e.target.value != 1) {
      this.setState({
        activeTab: 0
      });
    }
  };

  render() {
    const { hasShares } = this.props;
    const { activeTab } = this.state;
    return (
      <div>
        <div className="subscriber-section-tabs">
          <button
            type="button"
            onClick={e => this.switchChartView(e)}
            value={0}
            className={`subscriber-billing-tab ${
              activeTab === 0 ? 'active' : ''
            }`}
          >
            My Solar Project
          </button>
          {hasShares ? (
            <button
              type="button"
              onClick={e => this.switchChartView(e)}
              value={1}
              className={`subscriber-billing-tab ${
                activeTab === 1 ? 'active' : ''
              }`}
            >
              Community Solar Projects
            </button>
          ) : null}
        </div>
        {activeTab === 0 ? (
          <div className="subscriber-section-body">
            <div className="subscriber-billing-chart-container">
              Very nice graphs for my solar project
            </div>
          </div>
        ) : (
          <div className="subscriber-section-body">
            <div className="subscriber-billing-chart-container">
              Very nice graphs for community solar projects
            </div>
          </div>
        )}
      </div>
    );
  }
}
