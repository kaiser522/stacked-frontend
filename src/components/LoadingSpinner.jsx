import React from 'react';

const LoadingSpinner = ({ size = 'large', color = 'var(--primary-color)' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizeClasses[size]} border-4 border-gray-600 border-t-[var(--primary-color)] rounded-full animate-spin`}
        style={{ borderTopColor: color }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;