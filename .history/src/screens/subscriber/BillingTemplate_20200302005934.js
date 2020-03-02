import React, { Component } from 'react';
import {
  Page,
  Text,
  View,
  StyleSheet,
  Document,
  Image
} from '@react-pdf/renderer';
import '../../styles/BillBuilder.css';
import Logo from '../../assets/logo.png';

const styles = StyleSheet.create({
  sectionLayout: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  graySectionLayout: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f3f3f3'
  },
  borderSectionLayout: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#f3f3f3',
    border: '1px solid black'
  },
  backgroundWhite: {
    backgroundColor: 'white'
  },
  gray10: {
    color: '#747474'
  },
  font700: {
    fontWeight: 700
  },
  block: {
    display: 'block'
  },
  textRight: {
    textAlign: 'right'
  },
  font18: {
    fontSize: '18px'
  },
  font36: {
    fontSize: '36px'
  },
  blue90: {
    color: '#395578'
  },
  justifySpaceBetween: {
    justifyContent: 'space-between'
  },
  totalBorder: {
    border: '1px solid black'
  },
  backgroundGray: {
    backgroundColor: '#f3f3f3'
  },
  pdfContainer: {
    padding: '16px',
    height: '100%',
    margin: 'auto',
    width: '50%'
  },
  pdf: {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: '#fff'
  },
  border: {
    borderBottom: '1px solid #000'
  },
  left: {
    float: 'left'
  },
  right: {
    float: 'right'
  },
  flex: {
    display: 'flex'
  }
});

export default class BillingTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Document>
        <Page className={styles.pdfContainer}>
          <View style={styles.pdf}>
            <View>
              <Image src={Logo} alt="People Power Solar Cooperative Logo" />
            </View>
            <View style={styles.sectionLayout}>
              <View style={[styles.left, styles.gray10]}>
                <Text>1234 Address St.</Text>
                <Text>City, CA 12345</Text>
                <Text style={styles.font700}>Questions? Please Email:</Text>
                <Text>hello@peoplepowerolar.org</Text>
              </View>
              <View style={[styles.right, styles.flex]}>
                <View style={[styles.left, styles.font700, styles.textRight]}>
                  <Text>Account No:</Text>
                  <Text>Statement No:</Text>
                  <Text>Statement Date:</Text>
                  <Text>Due Date:</Text>
                </View>
                <View style={styles.right}>
                  <Text>001</Text>
                  <Text>002</Text>
                  <Text>01/05/2020</Text>
                  <Text>02/05/2020</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={[styles.font36, styles.font700, styles.blue90]}>
                Bill
              </Text>
              <Text style={styles.font18}>For Service during:</Text>
              <Text style={[styles.font18, styles.blue90, styles.font700]}>
                01/05/2020 - 02/05/2020
              </Text>
            </View>
            <View style={[styles.flex, styles.justifySpaceBetween]}>
              <View style={styles.left}>
                <Text style={[styles.font700, styles.font18]}>
                  Service For:
                </Text>
                <Text>Name 1</Text>
                <Text>123 Address St.</Text>
                <Text>City, CA 12345</Text>
              </View>
              <View style={styles.right}>
                <Text style={[styles.font700, styles.font18]}>
                  Your Account Summary
                </Text>
                <View
                  style={[
                    styles.flex,
                    styles.backgroundGray,
                    styles.justifySpaceBetween
                  ]}
                >
                  <View style={styles.left}>
                    <Text>Amount Due on Previous Statement:</Text>
                    <Text>Payment Recieved Since Last Statement:</Text>
                    <Text>Previous Unpaid Balance:</Text>
                    <Text>Current People Power Charges:</Text>
                  </View>
                  <View style={styles.right}>
                    <Text>$10.01</Text>
                    <Text>$10.01</Text>
                    {/* <View style={border"><View/> */}
                    <Text>$10.01</Text>
                    <Text>$10.01</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.backgronudGray,
                    styles.flex,
                    styles.justifySpaceBetween,
                    styles.totalBorder
                  ]}
                >
                  <Text style={[styles.left, styles.font700, styles.font18]}>
                    Total Amount Due
                  </Text>
                  <Text style={[styles.right, styles.font700, styles.font18]}>
                    $11.01
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={[styles.font700, styles.font18]}>
                Details of Charges
              </Text>
              <View
                style={[
                  styles.font700,
                  styles.flex,
                  styles.justifySpaceBetween
                ]}
              >
                <Text>Description</Text>
                <Text>Production</Text>
                <Text>Rate</Text>
                <Text>Total Price</Text>
              </View>
              <View
                style={[
                  styles.flex,
                  styles.backgroundGray,
                  styles.justifySpaceBetween
                ]}
              >
                <Text View>Energy Production</Text>
                <Text>000.000 kWh</Text>
                <Text>$00.0016</Text>
                <Text>$11.01</Text>
              </View>
            </View>
            {/* <View style={border"><View/> */}
            <View style={[styles.flex, styles.justifySpaceBetween]}>
              <View style={styles.left}>
                <Text>Excess Energy Produced During Bill Period:</Text>
                <Text>People Power Excess Energy Rebate for Bill Period:</Text>
                <Text>
                  East Bay Community Energy (NEM) Credits for Bill Period:
                </Text>
                <Text>
                  Your Total People Power Excess Energy Rebate Balance:
                </Text>
              </View>
              <View style={styles.right}>
                <Text>000.000 kWh</Text>
                <Text>$10.01</Text>
                <Text>$10.01</Text>
                <Text>$11.01</Text>
              </View>
            </View>
            <Text>chart</Text>
          </View>
        </Page>
      </Document>
    );
  }
}
