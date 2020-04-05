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
  // old styling
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
  },

  // new styling
  inline: {
    display: 'inline-block'
  },
  width33: {
    width: '33%'
  },
  bigTextPink: {
    fontFamily: 'Open Sans Bold',
    fontSize: 24,
    color: '#cd6795'
  },
  bigTextGray: {
    fontFamily: 'Open Sans Bold',
    fontSize: 24,
    color: '#747474'
  },
  textBoldBlue: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#395578',
    fontFamily: 'Open Sans Bold'
  },
  midTextBlue: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#395578',
    fontFamily: 'Open Sans'
  },
  midTextBoldPink: {
    fontSize: 14,
    lineHeight: 1.5,
    color: '#cd6795',
    fontFamily: 'Open Sans Bold'
  },
  smallTextBold: {
    fontSize: 8,
    lineHeight: 1.5,
    color: '#747474',
    fontFamily: 'Open Sans Bold'
  },
  smallText: {
    fontSize: 8,
    lineHeight: 1.5,
    color: '#747474',
    fontFamily: 'Open Sans'
  },
  textCenter: {
    textAlign: 'center'
  },
  flexSameHeight: {
    gridAutoRows: '1fr'
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
            <Image
              src={Logo}
              alt="People Power Solar Cooperative Logo"
              safePath="./assets"
              style={[styles.logo, styles.paddingVertical]}
            />
            <Text style={[styles.header]}>Energy Comparison</Text>
            <View style={[styles.paddingTop, styles.block]}>
              <Text style={[styles.inline, styles.text]}>
                Below is a summary of your energy costs and savings for your
                home, compared with your &quot;would-be&quot; costs with a local
                utility if you weren&apos;t with People Power. All costs from
              </Text>
              <Text style={[styles.inline, styles.boldText]}>
                April 2020 - Present.
              </Text>
            </View>
            <View
              style={[
                styles.textCenter,
                styles.flex,
                styles.paddingVertical,
                styles.flexSameHeight
              ]}
            >
              <View style={[styles.width33]}>
                <Text style={[styles.backgroundGray, styles.textBoldBlue]}>
                  What you&apos;ve paid for energy:
                </Text>
                <Text style={[styles.backgroundGray, styles.bigTextPink]}>
                  $537.38
                </Text>
              </View>
              <View style={[styles.width33]}>
                <Text style={[styles.backgroundGray, styles.textBoldBlue]}>
                  Your &quot;Would-Be&quot; charges w/o solar:*
                </Text>
                <Text style={[styles.backgroundGray, styles.bigTextGray]}>
                  $662.89
                </Text>
              </View>
              <View style={[styles.width33]}>
                <Text style={[styles.backgroundGray, styles.textBoldBlue]}>
                  Percent Savings:
                </Text>
                <Text style={[styles.backgroundGray, styles.bigTextPink]}>
                  18.93%
                </Text>
              </View>
            </View>
            <Text style={[styles.midTextBlue]}>
              Here&apos;s how we we calculated your $537.38 cost of energy:
            </Text>
            <View style={[]}>
              <Text style={[styles.midTextBoldPink]}>
                $0.00 + $115.51 + $1,105.35 - $369.31 - $314.17 = $537.38
              </Text>
              <Text style={[styles.smallTextBold]}>
                EBCE charges + PGE Charges + People Power Charges - EBCE NEM
                Credits - People Power Rebates = What you&apos;ve paid for
                energy
              </Text>
            </View>
            <View style={[]}>
              <Text style={[]}>Your Costs Over Time</Text>
              <Text style={[]}>Beautiful Charts</Text>
              <Text style={[[styles.smallText]]}>
                * Your &quot;Would-Be&quot; Charge from PG&amp;E is calculated
                as though you had been paying the current E-1 Residential Rate
                from PG&amp;E and EBCE.
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
