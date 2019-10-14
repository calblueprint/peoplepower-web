import React from 'react';
import {formValidation} from "./formValidarion";



class Basic_info extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            errors: {
                fname: '',
                lname: '',
                email: '',
                password: ''
            }
        }
    }

    nextButton = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }


    render(){
        const { values } = this.props;
        const { errors, touched } = this.props.values;
        return(
            <form>
                <div>
                    <label>First Name</label>
                    <input
                        name="fname"
                        placeholder='First Name'
                        onChange={this.props.handleChange}
                        defaultValue={values.fname}
                        className={`${ errors.fname != '' ? 'b-is-not-valid':'b-is-invalid' }`}
                        onBlur={this.props.handleFormValidation}
                    />
                </div>
                <div>{errors.fname ? errors.fname: '\u00A0'}</div>
                <div>
                    <label>Last Name</label>
                    <input
                        name="lname"
                        placeholder='Last Name'
                        onChange={this.props.handleChange}
                        defaultValue={values.lname}
                        className={`${ errors.lname != '' ? 'b-is-not-valid':'b-is-invalid' }`}
                        onBlur={this.props.handleFormValidation}
                    />
                </div>
                <div>{errors.lname ? errors.lname: '\u00A0'}</div>
                <div>
                    <label>Address</label>
                    <input
                        name="street"
                        placeholder='Address'
                        onChange={this.props.handleChange}
                        defaultValue={values.address.street}
                        className={`${ errors.street != '' ? 'b-is-not-valid':'b-is-invalid' }`}
                        onBlur={this.props.handleFormValidation}
                    />
                </div>
                <div>{errors.street ? errors.street: '\u00A0'}</div>
                <div>
                    <label>Apt</label>
                    <input
                        name="apt"
                        placeholder='Apt'
                        onChange={this.props.handleChange}
                        defaultValue={values.address.apt}
                    />
                </div>
                <div>
                    <label>State</label>
                    <input
                        name="state"
                        placeholder='State'
                        onChange={this.props.handleChange}
                        defaultValue={values.address.state}
                        className={`${ errors.state != '' ? 'b-is-not-valid':'b-is-invalid' }`}
                        onBlur={this.props.handleFormValidation}
                    />
                </div>
                <div>{errors.state ? errors.state: '\u00A0'}</div>
                <div>
                    <label>Zipcode</label>
                    <input
                        name="zipcode"
                        placeholder='Zipcode'
                        onChange={this.props.handleChange}
                        defaultValue={values.address.zipcode}
                        className={`${ errors.zipcode != '' ? 'b-is-not-valid':'b-is-invalid' }`}
                        onBlur={this.props.handleFormValidation}
                    />
                </div>
                <div>{errors.zipcode ? errors.zipcode: '\u00A0'}</div>
                {/*<div>*/}
                {/*    <label>Email</label>*/}
                {/*    <input*/}
                {/*        placeholder='Email'*/}
                {/*        onChange={this.props.handleChange('email')}*/}
                {/*        defaultValue={values.email}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <label>Password</label>*/}
                {/*    <input*/}
                {/*        placeholder='Password'*/}
                {/*        onChange={this.props.handleChange('password')}*/}
                {/*        defaultValue={values.password}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <label>Confirm Password</label>*/}
                {/*    <input*/}
                {/*        placeholder='Confirm Password'*/}
                {/*    />*/}
                {/*</div>*/}
                <button onClick={this.nextButton}>Next</button>
            </form>
        );
    }
}

export default Basic_info;