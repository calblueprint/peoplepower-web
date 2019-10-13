import React from 'react';
import Basic_info from "./basic_info";
import Basic_info_2 from "./basic_info_2";
import Bylaws from "./bylaws";
import Project_groups from "./project_groups";
import Payment from "./payment";
import {formValidation} from "./formValidarion";


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
            dividends: false,
            beneficiaries: [], //because there can be multiple
            payment_info: "", //need to revisit**
            billing_address:{
                street: "",
                apt: "",
                state: "",
                zipcode: ""
            },
            errors:{
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
                dividends: false,
                beneficiaries: [], //because there can be multiple
                payment_info: "", //need to revisit**
                billing_address:{
                    street: "",
                    apt: "",
                    state: "",
                    zipcode: ""
                }
            },
            step: 1
        };
        this.handleChange = this.handleChange.bind(this);

    }

    //next function increments page up one and switches to that numbered page
    nextStep = () => {
        const { step } = this.state
        this.setState({step: step + 1});
    }

    //prev function decrements page down one and switches to that numbered page
    prevStep = () => {
        const { step } = this.state
        this.setState({step: step - 1});
    }

    //updates the state whenever there is a change made
    handleChange = event => {
        switch(event.target.name){
            case "apt", "street", "state", "zipcode":
                this.setState({
                    address : {...this.state.address, [event.target.name]: event.target.value}
                })
            case "bylaw":
                const { bylaw } = this.state
                this.setState({
                    bylaw : !bylaw
                })
            default:
                this.setState({
                    [event.target.name] : event.target.value
                })
        }
    }

    handleFormValidation = event => {
        let errorMessage = '';
        let value = event.target.value;
        if (value == 0){
            errorMessage =  'Required';
        } else {
            switch(event.target.name) {
                case 'email':
                    errorMessage = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' : 'Invalid Email';
                case 'password':
                    if (value.length < 6){
                        errorMessage = 'Password is too short';
                    } else {
                        errorMessage = value.matches(/(?=.*[0-9])/) ? '' : 'Password must include a number';
                    }
            }
        }

        this.setState({
            errors : {...this.state.errors, [event.target.name]: errorMessage}
        })
    }

    onSubmit = (event) => {
        const { fname, lname } = this.state
        alert(`Your state values: \n 
            first name: ${fname} \n 
            last name: ${lname}`)
    }

    render(){
        const{step} = this.state;
        const{fname, lname, email, password, address, phone_number, bylaw, project_group, num_shares,
            dividends, beneficiaries, billing_address, payment_info, errors, touched} = this.state;
        const values = {fname, lname, email, password, address, phone_number, bylaw, project_group, num_shares,
            dividends, beneficiaries, billing_address, payment_info, errors, touched};

        switch(step){
            case 1:
                return(
                    <Basic_info
                        nextStep={this.nextStep}
                        values={values}
                        handleChange={this.handleChange}
                        handleFormValidation={this.handleFormValidation}
                    />);
            case 2:
                return(
                    <Basic_info_2
                        nextStep={this.nextStep}
                        values={values}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleFormValidation={this.handleFormValidation}
                    />
                    );
            case 3:
                return(
                    <Bylaws
                        nextStep={this.nextStep}
                        values={values}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleFormValidation={this.handleFormValidation}
                    />
                    );
            case 4:
                return(
                    <Project_groups
                        nextStep={this.nextStep}
                        values={values}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        handleFormValidation={this.handleFormValidation}
                    />
                    );
            case 5:
                return(
                    <Payment
                        values={values}
                        prevStep={this.prevStep}
                        onSubmit={this.onSubmit}
                        handleChange={this.handleChange}
                        handleFormValidation={this.handleFormValidation}
                    />
                    );
        }
    }
}

export default Onboarding;