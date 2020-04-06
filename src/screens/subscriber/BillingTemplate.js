import React from 'react';
import { Document } from '@react-pdf/renderer';
import BillingTemplate1 from './BillingTemplate1';
import BillingTemplate2 from './BillingTemplate2';

export default class BillingTemplate extends React.PureComponent {
  render() {
    return (
      <Document>
        <BillingTemplate1 {...this.props} />
        <BillingTemplate2 {...this.props} />
      </Document>
    );
  }
}
