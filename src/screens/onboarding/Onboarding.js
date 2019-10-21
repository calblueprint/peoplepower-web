import React from 'react';
import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import Bylaws from "./Bylaws";
import ProjectGroups from "./ProjectGroups";
import Payment from "./Payment";


class Onboarding extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "",
            // email: "",
            // password: "",
            street: "",
            apt: "",
            state: "",
            zipcode: "",
            phone_number: "",
            bylaw: false,
            project_group: "",
            num_shares: "",
            dividends: "",
            beneficiaries: [],
            payment_info: "",
            billing_address:{
                street: "",
                apt: "",
                state: "",
                zipcode: ""
            },
            errors:{ //object that holds all the error messages
                fname: "",
                lname: "",
                // email: "",
                // password: "",
                street: "",
                apt: "",
                state: "",
                zipcode: "",
                phone_number: "",
                bylaw: "",
                project_group: "",
                num_shares: "",
                dividends: false,
                beneficiaries: [],
                payment_info: "",
                b_street: "",
                b_apt: "",
                b_state: "",
                b_zipcode: ""
            },
            step: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.callBackBylawValidation = this.callBackBylawValidation.bind(this);

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

    //function for validation of bylaws
    callBackBylawValidation() {
        this.setState({
            errors : {...this.state.errors, bylaw: 'Required'}
        })
    }

    //updates the state whenever there is a change made
    handleChange = event => {
        switch(event.target.name){
            case "bylaw":
                this.setState({
                    bylaw : !this.state.bylaw
                })
            case "dividends":
                this.setState({
                    dividends : event.target.value
                })
            default:
                this.setState({
                    [event.target.name] : event.target.value
                })
        }
    }

    //validates the input divs
    handleFormValidation = event => {
        let errorMessage = '';
        let value = event.target.value;
        let name = event.target.name;
        if (value == 0){
            errorMessage =  'Required';
        } else {
            switch(name) {
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

    //handle onClick for bylaw
    handleClick(){
        this.setState({
            bylaw : !this.state.bylaw
        })
    }

    //temp submit button; this will have to update object in airtable
    onSubmit = (event) => {
        const { fname, lname } = this.state
        alert(`Your state values: \n 
            first name: ${fname} \n 
            last name: ${lname}`)
    }

    render(){
        const{step} = this.state;
        const{fname, lname, email, password, street, apt, state, zipcode, phone_number, bylaw, project_group, num_shares,
            dividends, beneficiaries, billing_address, payment_info, errors, touched} = this.state;
        const values = {fname, lname, email, password, street, apt, state, zipcode, phone_number, bylaw, project_group, num_shares,
            dividends, beneficiaries, billing_address, payment_info, errors, touched};

        switch(step){
            case 1:
                return(
                    <BasicInfo
                        nextStep={this.nextStep}
                        values={values}
                        handleChange={this.handleChange}
                        handleFormValidation={this.handleFormValidation}
                    />);
            case 2:
                return(
                    <ContactInfo
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
                        callBackBylawValidation={this.callBackBylawValidation}
                        handleClick={this.handleClick}
                    />
                    );
            case 4:
                return(
                    <ProjectGroups
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
                        handleDividends={this.handleDividends}
                    />
                    );
        }
    }
}

export default Onboarding;