import React from 'react';
import '../../styles/Investments.css';
import { connect } from 'react-redux';

class Investment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'world',
      word: 'potato',
      anotherKey: {
        nestedKey: 'value'
      }
    };

    const value = this.state['hello']; // world
    const hello = this.state.hello; // world
    const { hello } = this.state; // THE SAME THING

    // also equivalent!
    const hello = this.state.hello;
    const word = this.state.word;

    const { hello, word } = this.state;
  }

  render() {
    const { owner } = this.props;
    return (
      <div className="dashboard">
        <div className="mainheader">
          <h1>My Investment</h1>
          <div className="columnformat">
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

const mapStateToProps = state => ({
  owner: state.userData.owner
});

export default connect(mapStateToProps)(Investment);
