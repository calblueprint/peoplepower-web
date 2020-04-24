import React from 'react';
import '../styles/App.css';
import Constants from '../constants';

const { BUG_REPORT_URL } = Constants;

export default function FeedbackButton() {
  return (
    <button
      type="button"
      className="feedback-button-fixed"
      target="_blank"
      onClick={e => {
        e.preventDefault();
        window.open(BUG_REPORT_URL);
      }}
    >
      ?
    </button>
  );
}
