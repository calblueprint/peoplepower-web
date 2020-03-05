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
import fontRegular from '../../assets/fonts/OpenSans-Regular.ttf';
import fontBold from '../../assets/fonts/OpenSans-Bold.ttf';
import Logo from '../../assets/PPSC-logo-no-padding.png';

Font.register({
  family: 'Open Sans',
  src: fontRegular
});
Font.register({
  family: 'Open Sans Bold',
  src: fontBold
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
  flexRight: {
    display: 'flex',
    flexDirection: 'col'
  },
  textRight: {
    direction: 'rtl'
  },
  font18: {
    fontSize: 18
  },
  font36: {
    fontSize: 24
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
    border: '1 solid #555'
  },
  borderTop: {
    paddingTop: 3,
    borderTop: '1 solid #555'
  },
  marginTop: {
    marginTop: 10
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
    justifyContent: 'space-between',
    flex: 1
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
    fontFamily: 'Open Sans'
  },
  boldText: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#555',
    fontFamily: 'Open Sans Bold'
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
    padding: 3,
    fontFamily: 'Open Sans Bold'
  },
  midText: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#555',
    fontFamily: 'Open Sans'
  },
  midTextBold: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#555',
    fontFamily: 'Open Sans Bold'
  },
  midTextBoldBlue: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#555',
    fontFamily: 'Open Sans Bold'
  },
  largeTextBold: {
    fontSize: 16,
    lineHeight: 1.5,
    color: '#555',
    fontFamily: 'Open Sans Bold'
  },
  header: {
    fontFamily: 'Open Sans Bold',
    fontSize: 24,
    color: '#395578'
  },
  paddingBottom: {
    paddingBottom: 5
  },
  paddingLeft: {
    paddingLeft: 40
  },
  width25: {
    width: '25%'
  },
  thinBorder: {
    borderTop: '.001 solid #eee',
    borderBottom: '.01 solid #eee'
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
                  <View style={[styles.right, styles.paddingLeft]}>
                    <Text style={[styles.text]}>001</Text>
                    <Text style={[styles.text]}>002</Text>
                    <Text style={[styles.text]}>01/05/2020</Text>
                    <Text style={[styles.text]}>02/05/2020</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={[styles.header, styles.paddingTop]}>Bill</Text>
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
                    <Text style={[styles.text, styles.borderTop]}>
                      Previous Unpaid Balance:
                    </Text>
                    <Text style={[styles.text]}>
                      Current People Power Charges:
                    </Text>
                  </View>
                  <View style={[styles.right, styles.paddingLeft]}>
                    <Text style={[styles.text]}>$10.01</Text>
                    <Text style={[styles.text]}>$10.01</Text>
                    {/* <View style={border"><View/> */}
                    <Text style={[styles.text, styles.borderTop]}>$10.01</Text>
                    <Text style={[styles.text]}>$10.01</Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.flex,
                    styles.totalBorder,
                    styles.backgroundGray,
                    styles.border
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
              <Text style={[styles.largeTextBold, styles.paddingBottom]}>
                Details of Charges
              </Text>
              <View style={[styles.flex]}>
                <Text style={[styles.boldText, styles.width25]}>
                  Description
                </Text>
                <Text style={[styles.boldText, styles.width25]}>
                  Production
                </Text>
                <Text style={[styles.boldText, styles.width25]}>Rate</Text>
                <Text style={[styles.boldText, styles.width25]}>
                  Total Price
                </Text>
              </View>
              <View
                style={[
                  styles.flex,
                  styles.backgroundGray,
                  styles.justifySpaceBetween
                ]}
              >
                <Text style={[styles.text, styles.width25]}>
                  Energy Production
                </Text>
                <Text style={[styles.text, styles.width25]}>000.000 kWh</Text>
                <Text style={[styles.text, styles.width25]}>$00.0016</Text>
                <Text style={[styles.text, styles.width25]}>$11.01</Text>
              </View>
            </View>
            {/* <View style={border"><View/> */}
            <View
              style={[
                styles.flex,
                styles.justifySpaceBetween,
                styles.marginTop,
                styles.thinBorder
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
