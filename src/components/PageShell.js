import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../styles/Animations.css';

const PageShell = Page => {
  return props => (
    <ReactCSSTransitionGroup
      transitionAppear
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={200}
      transitionName="SlideIn"
    >
      <Page {...props} />
    </ReactCSSTransitionGroup>
  );
};

export default PageShell;
