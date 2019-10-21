import React from 'react';


class ContactInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    nextButton = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }


    prevButton = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const { values } = this.props;
        const { errors } = values;
        return(
            <form>
                <div>
                    <label>Address</label>
                    <input
                        name="street"
                        placeholder='Address'
                        onChange={this.props.handleChange}
                        defaultValue={values.street}
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
                        defaultValue={values.apt}
                    />
                </div>
                <div>
                    <label>State</label>
                    <input
                        name="state"
                        placeholder='State'
                        onChange={this.props.handleChange}
                        defaultValue={values.state}
                        className={`${ errors.state != '' ? 'b-is-not-valid':'b-is-invalid' }`}
                        onBlur={this.props.handleFormValidation}
                    />
                </div>
                <div>
                    <label>Zipcode</label>
                    <input
                        name="zipcode"
                        placeholder='Zipcode'
                        onChange={this.props.handleChange}
                        defaultValue={values.zipcode}
                        className={`${ errors.zipcode != '' ? 'b-is-not-valid':'b-is-invalid' }`}
                        onBlur={this.props.handleFormValidation}
                    />
                </div>
                <div>{errors.zipcode ? errors.zipcode: '\u00A0'}</div>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.nextButton}>Next</button>
            </form>
    );
    }
}

export default ContactInfo;