import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ path }) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = () => {
    setCopied('Link copied!');
    copy(`http://localhost:3000${path}`);
  };

  return (
    <>
      <button type="button" data-testid="share-btn" onClick={ copyToClipboard }>
        <img src={ shareIcon } alt="share-btn" />
      </button>
      <span>{copied}</span>
    </>
  );
}

ShareBtn.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ShareBtn;
