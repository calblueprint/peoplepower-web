import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Event fired when the input value is changed
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  handleSubmit = () => {
    const { history, suggestions } = this.props;
    history.state.suggestions.push(suggestions);
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      handleSubmit,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <div className="w-100">
            <div className="px-4">
              <div className="suggestions split-bar fl left mh1 ad-font ">
                {filteredSuggestions.map((suggestion, index) => {
                  let className;

                  // Flag the active suggestion with a class
                  if (index === activeSuggestion) {
                    className = 'suggestion-active';
                  }

                  return (
                    <button
                      type="button"
                      className={className}
                      key={suggestion}
                      onClick={onClick}
                    >
                      {suggestion}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      } else {
        suggestionsListComponent = (
          <div className="w-100">
            <div className="px-4 py-2">
              <div className="split-bar suggestions fl left mh1 ad-font br2 mv2">
                <h6>No orders found</h6>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        <div className=" w-60 center ">
          <form className="px-4 py-2">
            <input
              type="text"
              placeholder=""
              className="fl left split-bar br2 ba bg-light-gray mh1 pa2 ad-font bg-light-gray"
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
            />
            <input
              type="submit"
              value="SEARCH"
              className="float-right split-button br2 dim white b-purple mh1 pa2 ad-font bg-purple"
              onClick={handleSubmit}
            />
          </form>
          <div id="menuItems" />
          {suggestionsListComponent}
        </div>
      </div>
    );
  }
}

export default SearchBar;
