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
            // email: "",
            // password: "",
            address: {
                street: "",
                apt: "",
                state: "",
                zipcode: ""
            },
            phone_number: "",
            bylaw: false,
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
            },
            step: 1
        };
        this.handleChange = this.handleChange.bind(this);

    }

    nextStep = () => {
        const { step } = this.state
        this.setState({step: step + 1});
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({step: step - 1});
    }

    handleChange = input => event => {
        if(input == "apt" || input == "street" || input == "state" || input == "zipcode"){
            this.setState({
                address : {...this.state.address, [input]: event.target.value}
            })
        } else if(input == "bylaw"){
            const { bylaw } = this.state
            this.setState({
                bylaw : !bylaw
            })
        } else {
            this.setState({
                [input] : event.target.value
            })
        }
    }

    onSubmit() {
        return "Your account has been created";
    }

    render(){
        const{step} = this.state;
        const{fname, lname, email, password, address, phone_number, bylaw, project_group, num_shares,
            dividends, beneficiaries, billing_address, payment_info} = this.state;
        const values = {fname, lname, email, password, address, phone_number, bylaw, project_group, num_shares, dividends, beneficiaries, billing_address, payment_info};
        switch(step){
            case 1:
                return(
                    <Basic_info
                        nextStep={this.nextStep}
                        values={values}
                        handleChange={this.handleChange}
                    />);
            case 2:
                return(
                    <Basic_info_2
                        nextStep={this.nextStep}
                        values={values}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                    />
                    );
            case 3:
                return(
                    <Bylaws
                        nextStep={this.nextStep}
                        values={values}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                    />
                    );
            case 4:
                return(
                    <Project_groups
                        nextStep={this.nextStep}
                        values={values}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                    />
                    );
            case 5:
                return(
                    <Payment
                        values={values}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                    />
                    );
        }
    }
}

export default Onboarding;