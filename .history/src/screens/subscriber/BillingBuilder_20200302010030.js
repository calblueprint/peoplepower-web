import React, { Component } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import BillingTemplate from './BillingTemplate';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Bill Statement</h1>
        <PDFViewer>
          <BillingTemplate />
        </PDFViewer>
        <PDFDownloadLink document={<BillingTemplate />} fileName="bill.pdf">
          {({ loading }) => (loading ? 'Loading document...' : 'Download Pdf')}
        </PDFDownloadLink>
      </div>
    );
  }
}

// render(<App />, document.getElementById('root'));
