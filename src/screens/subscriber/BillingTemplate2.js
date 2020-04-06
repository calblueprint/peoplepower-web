import React, { Component } from 'react';
import { Page, Text, View, Image } from '@react-pdf/renderer';
import Logo from '../../assets/PPSC-logo-no-padding.png';
import styles from './PDFStyles';

export default class BillingTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
              Below is a summary of your energy costs and savings for your home,
              compared with your &quot;would-be&quot; costs with a local utility
              if you weren&apos;t with People Power. All costs from
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
              <Text
                style={[
                  styles.cardHeader,
                  styles.backgroundGray,
                  styles.textBoldBlue
                ]}
              >
                What you&apos;ve paid for energy:
              </Text>
              <Text
                style={[
                  styles.margintTopSmall,
                  styles.paddingVerticalLarge,
                  styles.backgroundGray,
                  styles.bigTextPink
                ]}
              >
                $537.38
              </Text>
            </View>
            <View style={[styles.width33]}>
              <Text
                style={[
                  styles.cardHeader,
                  styles.backgroundGray,
                  styles.textBoldBlue
                ]}
              >
                Your &quot;Would-Be&quot; charges w/o solar: *
              </Text>
              <Text
                style={[
                  styles.margintTopSmall,
                  styles.paddingVerticalLarge,
                  styles.backgroundGray,
                  styles.bigTextGray
                ]}
              >
                $662.89
              </Text>
            </View>
            <View style={[styles.width33]}>
              <Text
                style={[
                  styles.cardHeader,
                  styles.backgroundGray,
                  styles.textBoldBlue
                ]}
              >
                Percent Savings:
              </Text>
              <Text
                style={[
                  styles.margintTopSmall,
                  styles.paddingVerticalLarge,
                  styles.backgroundGray,
                  styles.bigTextPink
                ]}
              >
                18.93%
              </Text>
            </View>
          </View>
          <Text style={[styles.midTextBlue]}>
            Here&apos;s how we we calculated your $537.38 cost of energy:
          </Text>
          <View style={[styles.paddingVertical]}>
            <Text style={[styles.midTextBoldPink, styles.textCenter]}>
              $0.00 + $115.51 + $1,105.35 - $369.31 - $314.17 = $537.38
            </Text>
            <Text style={[styles.smallTextBlue, styles.textCenter]}>
              EBCE charges + PGE Charges + People Power Charges - EBCE NEM
              Credits - People Power Rebates = What you&apos;ve paid for energy
            </Text>
          </View>
          <View style={[]}>
            <Text style={[styles.headerThisBlue, styles.textCenter]}>
              Your Costs Over Time
            </Text>
            <View style={[styles.paddingVertical]}>
              <Text>Charts</Text>
            </View>
            <Text style={[[styles.smallText]]}>
              * Your &quot;Would-Be&quot; Charge from PG&amp;E is calculated as
              though you had been paying the current E-1 Residential Rate from
              PG&amp;E and EBCE.
            </Text>
          </View>
        </View>
      </Page>
    );
  }
}
