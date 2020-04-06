import React, { Component } from 'react';
import { PDFViewer, StyleSheet } from '@react-pdf/renderer';
import BillingTemplate from '../subscriber/BillingTemplate';
import BillingChart from '../subscriber/BillingChart';

const data = require('./data.js');

const styles = StyleSheet.create({
  open: {
    display: 'block'
  },
  close: {
    display: 'none'
  },
  viewer: {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  button: {
    color: 'var(--pp-gray)',
    fontSize: '18px',
    fontWeight: 800,
    lineHeight: '25px',
    backgroundColor: 'white',
    font: '800 18px system-ui',
    textAlign: 'center',
    width: '25%',
    margin: 'auto',
    marginTop: '2rem',
    padding: ' .5rem .1rem',
    borderRadius: '10px',
    border: 'none'
  }
});

export default class BillingBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerVisible: false
    };
  }

  toggleViewer = () => {
    const { viewerVisible } = this.state;
    this.setState({
      viewerVisible: !viewerVisible
    });
  };

  render() {
    const { viewerVisible } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Bill Statement</h1>
        <button onClick={this.toggleViewer} type="button" style={styles.button}>
          View PDF
        </button>
        {viewerVisible ? (
          <PDFViewer style={[styles.opens, styles.viewer]}>
            <BillingTemplate {...data} />
          </PDFViewer>
        ) : null}
        <BillingChart />
      </div>
    );
  }
}
