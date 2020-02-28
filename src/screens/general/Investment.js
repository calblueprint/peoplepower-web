import React from 'react';
import '../../styles/Investments.css';

class Investment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  render() {
    return (
      <div className="dashboard">
        <div className="everything">
          <h1>My Investment</h1>
          <div className="leftandright-content">
            <div className="left-content">
              <h2>My Investment</h2>
              <div className="investment-box-1">investments box 1 test</div>
              <div className="investment-box-2">investments box 2 test</div>
              <h2>Transactions</h2>
              <div className="transactions-box">transactions box test</div>
            </div>
            <div className="right-content">
              <h2>Financial Breakdown</h2>
              <div className="fin-box">fin box test</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Investment;
