import React from 'react';
import {Dropdown} from "semantic-ui-react";
import {formValidation} from "./formValidarion";


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
        const { groups } = [
            {text: 'Berkeley', value: 'berkeley'},
            {text: 'Oakland', value: 'oakland'}
        ];
        return(
            <form>
                <div>
                    <Dropdown
                        placeholder='Select Project Group'
                        name="project_group"
                        onChange={this.props.handleChange}
                        selection
                        options={groups}
                        value={values.project_group}
                    />
                </div>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.nextButton}>Next</button>
            </form>
    );
    }
}

export default Project_groups;