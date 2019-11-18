import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import '../styles/Onboarding.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    const { title } = this.props;
    this.state = {
      listOpen: false,
      headerTitle: title
    };
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    const { listOpen } = this.state;
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('click', this.close);
      } else {
        window.removeEventListener('click', this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.close);
  }

  close() {
    this.setState({
      listOpen: false
    });
  }

  selectItem(title) {
    const { handleChange } = this.props;
    this.setState({
      headerTitle: title,
      listOpen: false
    });
    const event = {
      target: {
        name: 'state',
        value: title
      }
    };
    handleChange(event);
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render() {
    const { list } = this.props;
    const { listOpen, headerTitle } = this.state;
    return (
      <div className="dd-wrapper">
        <button
          className="dd-header"
          onClick={() => this.toggleList()}
          type="button"
        >
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen ? (
            <FontAwesome name="angle-up" size="2x" />
          ) : (
            <FontAwesome name="angle-down" size="2x" />
          )}
        </button>
        {listOpen && (
          <button
            type="button"
            className="dd-list"
            onClick={e => e.stopPropagation()}
          >
            {list.map(item => (
              <button
                type="button"
                className="dd-list-item"
                key={item}
                onClick={() => this.selectItem(item)}
              >
                {item} {item && <FontAwesome name="check" />}
              </button>
            ))}
          </button>
        )}
      </div>
    );
  }
}

export default Dropdown;
