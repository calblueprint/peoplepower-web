import React from 'react';

export default class DashboardChartsSection extends React.PureComponent {
  render() {
    const { activeTab, hasShares } = this.props;
    return (
      <div>
        <div className="subscriber-section-tabs">
          <button
            type="button"
            onClick={this.switchChartView}
            className={`subscriber-billing-tab ${
              activeTab === 'My Solar Project' ? 'active' : ''
            }`}
          >
            My Solar Project
          </button>
          {hasShares ? (
            <button
              type="button"
              onClick={this.switchChartView}
              className={`subscriber-billing-tab ${
                activeTab === 'Community Solar Projects' ? 'active' : ''
              }`}
            >
              Community Solar Projects
            </button>
          ) : null}
        </div>
        {activeTab === 'My Solar Project' ? (
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
