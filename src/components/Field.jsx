import React from 'react';

const Field = () => {
  const skyStyle = {
    fill: '#30abef',
  };
  const fieldWidth = 2000;
  const fieldHeight = 1000;
  return (
    <rect
      style={skyStyle}
      x={-400}
      y={-100}
      width={fieldWidth+800}
      height={fieldHeight+200}
    />
  );
};

export default Field;