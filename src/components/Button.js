import React from 'react';
// import { Link } from 'react-router-dom';

function Button({
  text,
  to,
  imageUrl,
  imageWidth = 'auto',
  imageHeight = 'auto'
}) {
  const handleImageClick = () => {
    window.location.href = to;
  };

  return (
    <div className="custom-button">
      <div className="image-container">
        <img
          src={imageUrl}
          width={imageWidth}
          height={imageHeight}
          onClick={handleImageClick}
          alt=""
        />
      </div>
      {/* <div className="text-container">
        {text && <Link to={to}>{text}</Link>}
      </div> */}
    </div>
  );
}

export default Button;
