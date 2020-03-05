import React, { Component } from 'react';
import {
  Page,
  Text,
  View,
  StyleSheet,
  Document,
  Image,
  Font
} from '@react-pdf/renderer';
import Logo from '../../assets/PPSC-logo-no-padding.png';

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: `https://fonts.googleapis.com/css?family=Open+Sans:400&display=swap`
    },
    {
      src: `https://fonts.googleapis.com/css?family=Open+Sans:600&display=swap`,
      fontWeight: 'bold'
    }
  ]
});

const styles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: 'white'
  },
  gray10: {
    color: '#747474'
  },
  font700: {
    fontWeight: 'bold'
  },
  block: {
    display: 'block'
  },
  textRight: {
    textAlign: 'right'
  },
  font18: {
    fontSize: 18
  },
  font36: {
    fontSize: 36
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
    height: '100%',
    margin: '16px 24px',
    width: 50
  },
  pdf: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fff',
    width: '90%'
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    width: '30%'
  },
  paddingVertical: {
    padding: '10px 0'
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#747474',
    fontWeight: 'normal'
  },
  boldText: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#747474',
    fontWeight: 'bold'
  },
  lineHeight24: {
    lineHeight: 1.5
  },
  paddingTop: {
    paddingTop: 16
  },
  pinkText: {
    color: '#cd6795',
    fontSize: 14,
    fontWeight: 'bold'
  },
  midText: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#747474',
    fontWeight: 'normal'
  },
  midTextBold: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#747474',
    fontWeight: 'bold'
  },
  midTextBoldBlue: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#395578',
    fontWeight: 'bold'
  },
  paddingBottom: {
    paddingBottom: 10
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
        <Page style={styles.pdfContainer}>
          <View style={styles.pdf}>
            <View>
              <Image
                src={Logo}
                alt="People Power Solar Cooperative Logo"
                style={[styles.logo, styles.paddingVertical]}
              />
            </View>
            <View style={[styles.flex, styles.justifyContent]}>
              <View style={[styles.left]}>
                <Text style={[styles.text]}>1234 Address St.</Text>
                <Text style={[styles.text]}>City, CA 12345</Text>
                <Text style={[styles.boldText]}>Questions? Please Email:</Text>
                <Text style={[styles.text]}>hello@peoplepowerolar.org</Text>
              </View>
              <View style={[styles.right]}>
                <View style={[styles.flex]}>
                  <View style={[styles.left]}>
                    <Text style={[styles.boldText]}>Account No:</Text>
                    <Text style={[styles.boldText]}>Statement No:</Text>
                    <Text style={[styles.boldText]}>Statement Date:</Text>
                    <Text style={[styles.boldText]}>Due Date:</Text>
                  </View>
                  <View style={[styles.right]}>
                    <Text style={[styles.text]}>001</Text>
                    <Text style={[styles.text]}>002</Text>
                    <Text style={[styles.text]}>01/05/2020</Text>
                    <Text style={[styles.text]}>02/05/2020</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.font36,
                  styles.font700,
                  styles.blue90,
                  styles.paddingTop
                ]}
              >
                Bill
              </Text>
              <Text style={[styles.midText]}>For Service during:</Text>
              <Text style={[styles.midTextBoldBlue]}>
                01/05/2020 - 02/05/2020
              </Text>
            </View>
            <View style={[styles.flex, styles.paddingTop]}>
              <View style={styles.left}>
                <Text style={[styles.boldText]}>Service For:</Text>
                <Text style={[styles.text]}>Name 1</Text>
                <Text style={[styles.text]}>123 Address St.</Text>
                <Text style={[styles.text]}>City, CA 12345</Text>
              </View>
              <View style={styles.right}>
                <Text style={[styles.boldText]}>Your Account Summary</Text>
                <View style={[styles.flex, styles.backgroundGray]}>
                  <View style={styles.left}>
                    <Text style={[styles.text]}>
                      Amount Due on Previous Statement:
                    </Text>
                    <Text style={[styles.text]}>
                      Payment Recieved Since Last Statement:
                    </Text>
                    <Text style={[styles.text]}>Previous Unpaid Balance:</Text>
                    <Text style={[styles.text]}>
                      Current People Power Charges:
                    </Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={[styles.text]}>$10.01</Text>
                    <Text style={[styles.text]}>$10.01</Text>
                    {/* <View style={border"><View/> */}
                    <Text style={[styles.text]}>$10.01</Text>
                    <Text style={[styles.text]}>$10.01</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.flex,
                    styles.totalBorder,
                    styles.backgroundGray
                  ]}
                >
                  <Text style={[styles.left, styles.pinkText]}>
                    Total Amount Due
                  </Text>
                  <Text style={[styles.right, styles.pinkText]}>$11.01</Text>
                </View>
              </View>
            </View>
            <View style={styles.paddingTop}>
              <Text
                style={[styles.font700, styles.font18, styles.paddingBottom]}
              >
                Details of Charges
              </Text>
              <View style={[styles.flex]}>
                <Text style={[styles.boldText]}>Description</Text>
                <Text style={[styles.boldText]}>Production</Text>
                <Text style={[styles.boldText]}>Rate</Text>
                <Text style={[styles.boldText]}>Total Price</Text>
              </View>
              <View
                style={[
                  styles.flex,
                  styles.backgroundGray,
                  styles.justifySpaceBetween
                ]}
              >
                <Text style={[styles.text]}>Energy Production</Text>
                <Text style={[styles.text]}>000.000 kWh</Text>
                <Text style={[styles.text]}>$00.0016</Text>
                <Text style={[styles.text]}>$11.01</Text>
              </View>
            </View>
            {/* <View style={border"><View/> */}
            <View
              style={[
                styles.flex,
                styles.justifySpaceBetween,
                styles.paddingTop
              ]}
            >
              <View style={styles.left}>
                <Text style={[styles.text]}>
                  Excess Energy Produced During Bill Period:
                </Text>
                <Text style={[styles.text]}>
                  People Power Excess Energy Rebate for Bill Period:
                </Text>
                <Text style={[styles.text]}>
                  East Bay Community Energy (NEM) Credits for Bill Period:
                </Text>
                <Text style={[styles.text]}>
                  Your Total People Power Excess Energy Rebate Balance:
                </Text>
              </View>
              <View style={styles.right}>
                <Text style={[styles.text]}>000.000 kWh</Text>
                <Text style={[styles.text]}>$10.01</Text>
                <Text style={[styles.text]}>$10.01</Text>
                <Text style={[styles.text]}>$11.01</Text>
              </View>
            </View>
            <Text>chart</Text>
          </View>
        </Page>
      </Document>
    );
  }
}
