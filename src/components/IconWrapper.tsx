import React from 'react';

interface IconWrapperProps {
  icon: string;
  name: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ icon, name }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg flex items-center justify-center">
        <img src={icon} alt={name} className="w-12 h-12" />
      </div>
      <span className="mt-1 text-sm text-white text-center shadow-text">
        {name}
      </span>
    </div>
  );
};

export default IconWrapper;