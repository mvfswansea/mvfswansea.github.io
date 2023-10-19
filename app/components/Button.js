import React from 'react';

function Button({ text, link }) {
  return (
    <a href={link} className="button">
      {text}
    </a>
  );
}

export default Button;
