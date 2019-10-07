import React from 'react';
import {Form} from "semantic-ui-react";


class Project_groups extends React.Component {

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
            <Form>
                <Form.Field label='Project Group' control='select'>
                    <option value='Berkeley'>Berkeley</option>
                    <option value='Oakland'>Oakland</option>
                </Form.Field>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.nextButton}>Next</button>
            </Form>
    );
    }
}

export default Project_groups;