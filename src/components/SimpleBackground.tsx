
import React from 'react';

const SimpleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <div className="absolute inset-0 circuit-bg opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent opacity-30"></div>
    </div>
  );
};

export default SimpleBackground;
