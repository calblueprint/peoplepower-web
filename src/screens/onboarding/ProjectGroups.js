import React from 'react';
import formValidation from '../../lib/formValidation';

class ProjectGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  nextButton = e => {
    e.preventDefault();
    const { values, nextStep } = this.props;
    const { errors, projectGroup } = values;

    const errorMessage = formValidation('projectGroup', projectGroup);
    errors[projectGroup] = errorMessage;
    if (errorMessage === '') {
      nextStep();
    } else {
      this.forceUpdate();
    }
  };

  prevButton = e => {
    const { prevStep } = this.props;
    e.preventDefault();
    prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const { errors } = values;
    const { projectGroup } = errors;

    return (
      <form>
        <div>
          Select Project Group
          <select
            value={projectGroup}
            onChange={handleChange}
            name="projecGroup"
          >
            <option value="Choose a group...">Choose a group...</option>
            <option value="Berkeley">Berkeley</option>
            <option value="Oakland">Oakland</option>
          </select>
        </div>
        <div>{errors.project_group ? errors.project_group : '\u00A0'}</div>
        <button type="button" onClick={this.prevButton}>
          Prev
        </button>
        <button type="button" onClick={this.nextButton}>
          Next
        </button>
      </form>
    );
  }
}

export default ProjectGroups;
