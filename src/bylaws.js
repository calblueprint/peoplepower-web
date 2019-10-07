import React from 'react';
import {Form, Checkbox} from "semantic-ui-react";


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
        return(
            <div>
                <Form.Field>
                    <Checkbox label='Agree' onchange={this.props.handleChange('bylaw')}/>
                </Form.Field>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.nextButton}>Next</button>
            </div>
    );
    }
}

export default Bylaws;