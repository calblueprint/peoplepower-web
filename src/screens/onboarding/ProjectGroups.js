import React from 'react';


class ProjectGroups extends React.Component {

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
            <form>
                <div>
                    Select Project Group
                    <select value={this.props.values.project_group} onChange={this.props.handleChange} name="project_group">
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

export default ProjectGroups;