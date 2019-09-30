import React from 'react';
import Basic_info from "./basic_info";
import Basic_info_2 from "./basic_info_2";
import Bylaws from "./bylaws";
import Project_groups from "./project_groups";
import Payment from "./payment";

class Onboarding extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            password: "",
            address: {
                street: "",
                apt: "",
                state: "",
                zipcode: ""
            },
            phone_number: "",
            project_group: "",
            num_shares: "",
            dividends: "",
            beneficiaries: [], //because there can be multiple
            payment_info: "", //need to revisit**
            billing_address:{
                street: "",
                apt: "",
                state: "",
                zipcode: ""
            }
            step: 1
        };

    }

    nextStep() {
        this.setState({step: step + 1});
    }

    prevStep() {
        this.setState({step: step - 1});
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    onSubmit() {
        return "Your account has been created";
    }

    render(){
        const{step} = this.state;
        const{fname, lname, email, password, address, phone_number, project_group, num_shares,
            divideends, beneficiaries, billing_address, payment_info} = this.state;
        const values = {fname, lname, email, password, address, phone_number, project_group, num_shares,
            dividends, beneficiaries, billing_address, payment_info};
        switch(step){
            case 1:
                return(
                    <Basic_info
                        nextStep={this.nextStep()}
                        values={values}
                    />
                );
            case 2:
                return
                    <Basic_info_2
                        nextStep={this.nextStep()}
                        values={values}
                        prevStep={this.prevStep()
                    />
            case 3:
                return
                    <Bylaws
                        nextStep={this.nextStep()}
                        values={values}
                        prevStep={this.prevStep()
                    />
            case 4:
                return
                    <Project_groups
                        nextStep={this.nextStep()}
                        values={values}
                        prevStep={this.prevStep()
                    />
            case 5:
                return
                    <Payment
                        values={values}
                        prevStep={this.prevStep()
                    />
        }
    }
}

export default Onboarding;