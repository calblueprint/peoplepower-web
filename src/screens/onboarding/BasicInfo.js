import React from 'react';
import formValidation from "../../lib/formValidation";

class BasicInfo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        }
    }

    //validates then moves on if no error messages
    nextButton = (e) => {
        e.preventDefault();
        const { values } = this.props;
        let fields = ['fname', 'lname'];
        let errors = [];

        for (var i = 0; i < fields.length; i++){
            let errorMessage = formValidation(fields[i], values[fields[1]]);
            this.props.values.errors[fields[i]] = errorMessage;
            if (errorMessage !== "") {
                errors.push(errorMessage);
            }
        }

        if (!(errors && errors.length > 0)) {
            this.props.nextStep();
        } else {
            this.forceUpdate();
        }
    }


    render(){
        const { values } = this.props;
        const { errors } = this.props.values;
        return(
            <form>
                <div>
                    <label>First Name</label>
                    <input
                        name="fname"
                        placeholder='First Name'
                        onChange={this.props.handleChange}
                        defaultValue={values.fname}
                        className={`${ errors.fname !== '' ? 'b-is-not-valid':'b-is-invalid' }`}
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
                        className={`${ errors.lname !== '' ? 'b-is-not-valid':'b-is-invalid' }`}
                        onBlur={this.props.handleFormValidation}
                    />
                </div>
                <div>{errors.lname ? errors.lname: '\u00A0'}</div>
                <button onClick={this.nextButton}>Next</button>
            </form>
        );
    }
}

export default BasicInfo;