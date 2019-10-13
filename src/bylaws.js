import React from 'react';
import {Form, Checkbox} from "semantic-ui-react";
import {formValidation} from "./formValidarion";


class Bylaws extends React.Component {

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
                    <Checkbox
                        name="bylaw"
                        label='Agree'
                        onClick={this.props.handleChange}
                        checked={values.bylaw}
                        onBlur={this.props.handleFormValidation}
                    />
                    <div>{errors.state ? errors.state: '\u00A0'}</div>
                </div>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.nextButton}>Next</button>
            </form>
    );
    }
}

export default Bylaws;