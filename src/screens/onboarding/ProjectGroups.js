import React from 'react';
import formValidation from "../../lib/formValidation";


class ProjectGroups extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    nextButton = (e) => {
        e.preventDefault();

        let errorMessage = formValidation("project_group", this.props.values.project_group);
        this.props.values.errors.project_group = errorMessage;
        if (errorMessage === "") {
            this.props.nextStep();
        } else {
            this.forceUpdate();
        }
    }


    prevButton = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const { errors } = this.props.values;

        return(
            <form>
                <div>
                    Select Project Group
                    <select value={this.props.values.project_group} onChange={this.props.handleChange} name="project_group">
                        <option value="Choose a group...">Choose a group...</option>
                        <option value="Berkeley">Berkeley</option>
                        <option value="Oakland">Oakland</option>
                    </select>
                </div>
                <div>{errors.project_group ? errors.project_group: '\u00A0'}</div>
                <button onClick={this.prevButton}>Prev</button>
                <button onClick={this.nextButton}>Next</button>
            </form>
    );
    }
}

export default ProjectGroups;