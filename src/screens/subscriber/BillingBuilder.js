import React from 'react';
import Logo from '../../assets/logo.png';
import '../../styles/BillBuilder.css';

export default class BillingBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="b-white block w-100">
        <div className="">
          <img src={Logo} alt="People Power Solar Cooperative Logo" />
        </div>
        <div className="flex">
          <div className="left gray-10">
            <div className="">1234 Address St.</div>
            <div className="">City, CA 12345</div>
            <div className="font-700">Questions? Please Email:</div>
            <div className="">hello@peoplepowerolar.org</div>
          </div>
          <div className="right flex">
            <div className="left font-700 t-right">
              <div className="">Account No:</div>
              <div className="">Statement No:</div>
              <div className="">Statement Date:</div>
              <div className="">Due Date:</div>
            </div>
            <div className="right">
              <div className="">001</div>
              <div className="">002</div>
              <div className="">01/05/2020</div>
              <div className="">02/05/2020</div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="f-36 font-700 blue-90">Bill</div>
          <div className="f-18 ">For Service during:</div>
          <div className="f-18 blue-90 font-700">01/05/2020 - 02/05/2020</div>
        </div>
        <div className="flex">
          <div className="left">
            <div className="font-700 f-18">Service For:</div>
            <div className="">Name 1</div>
            <div className="">123 Address St.</div>
            <div className="">City, CA 12345</div>
          </div>
          <div className="right">
            <div className="font-700 f-18">Your Account Summary</div>
            <div className="flex bg-gray">
              <div className="left">
                <div className="">Amount Due on Previous Statement:</div>
                <div className="">Payment Recieved Since Last Statement:</div>
                <div className="">Previous Unpaid Balance:</div>
                <div className="">Current People Power Charges:</div>
              </div>
              <div className="right">
                <div className="">$10.01</div>
                <div className="">$10.01</div>
                <hr />
                <div className="">$10.01</div>
                <div className="">$10.01</div>
              </div>
            </div>
            <div className=" bg-gray flex justify-space-between total-border">
              <div className="left font-700 f-18">Total Amount Due</div>
              <div className="right font-700 f-18">$11.01</div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="font-700 f-18">Details of Charges</div>
          <div className="font-700 flex justify-space-between">
            <div className="">Description</div>
            <div className="">Production</div>
            <div className="">Rate</div>
            <div className="">Total Price</div>
          </div>
          <div className="flex bg-gray justify-space-between">
            <div className="">Energy Production</div>
            <div className="">000.000 kWh</div>
            <div className="">$00.0016</div>
            <div className="">$11.01</div>
          </div>
        </div>
        <hr />
        <div className="flex">
          <div className="left ">
            <div className="">Excess Energy Produced During Bill Period:</div>
            <div className="">
              People Power Excess Energy Rebate for Bill Period:
            </div>
            <div className="">
              East Bay Community Energy (NEM) Credits for Bill Period:
            </div>
            <div className="">
              Your Total People Power Excess Energy Rebate Balance:
            </div>
          </div>
          <div className="right">
            <div className="">000.000 kWh</div>
            <div className="">$10.01</div>
            <div className="">$10.01</div>
            <div className="">$11.01</div>
          </div>
        </div>
        <div className="">chart</div>
      </div>
    );
  }
}
