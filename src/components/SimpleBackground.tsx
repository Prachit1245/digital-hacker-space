
import React from 'react';

const SimpleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-[-1]">
      <div className="absolute inset-0 circuit-bg opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 to-transparent opacity-20"></div>
    </div>
  );
};

export default SimpleBackground;
