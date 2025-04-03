
import React from 'react';

const SimpleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 opacity-100"></div>
      <div className="absolute inset-0 circuit-bg opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-radial from-neon-blue/20 to-transparent opacity-50"></div>
    </div>
  );
};

export default SimpleBackground;
