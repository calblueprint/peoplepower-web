import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Open Sans',
  src: '../../assets/fonts/OpenSans-Regular.ttf'
});
Font.register({
  family: 'Open Sans Bold',
  src: '../../assets/fonts/OpenSans-Bold.ttf'
});

export default StyleSheet.create({
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
    backgroundColor: 'white',
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
