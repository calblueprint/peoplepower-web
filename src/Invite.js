import React from 'react';
import Form from './form';

class Invite extends React.Component {
  state = {
    fields: {}
  };
  
  onSubmit = fields => { 
    this.setState({fields});
  };
  
  render() {
    return (
      <div className="Invite">
        <Form onSubmit={fields => this.onSubmit(fields)} />
        <p> {JSON.stringify(this.state.fields, null, 2)} </p>
      </div>
    );
  }


}


export default Invite;