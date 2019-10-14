import React from 'react';
import {Dropdown} from "semantic-ui-react";
import {formValidation} from "./formValidarion";


class Project_groups extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            // groups: [
            //     "Choose a group...",
            //     "Berkeley",
            //     "Oakland"]
            // }
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
            <form>
                <div>
                    Select Project Group
                    <select value={this.props.values.project_group} onChange={this.props.handleChange} name="project_group">
                        {/*groups.map((group)=>*/}
                        {/*    (<option value={group}> {group} </option>)*/}
                        {/*);*/}
                        <option value="Choose a group...">Choose a group...</option>
                        <option value="Berkeley">Berkeley</option>
                        <option value="Oakland">Oakland</option>
                    </select>
                </div>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.nextButton}>Next</button>
            </form>
    );
    }
}

export default Project_groups;