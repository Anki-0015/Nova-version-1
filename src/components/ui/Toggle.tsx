import React from 'react';

interface ToggleProps {
  isChecked: boolean;
  onChange: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({
  isChecked,
  onChange,
  label,
  size = 'md',
  disabled = false,
}) => {
  const sizeClasses = {
    sm: {
      toggle: 'w-8 h-4',
      circle: 'w-3 h-3',
      translateX: 'translate-x-4',
    },
    md: {
      toggle: 'w-11 h-6',
      circle: 'w-5 h-5',
      translateX: 'translate-x-5',
    },
    lg: {
      toggle: 'w-14 h-7',
      circle: 'w-6 h-6',
      translateX: 'translate-x-7',
    },
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={onChange}
          disabled={disabled}
        />
        <div
          className={`
            ${sizeClasses[size].toggle} 
            ${isChecked ? 'bg-primary-500' : 'bg-gray-300 dark:bg-dark-400'} 
            rounded-full transition-colors duration-200 ease-in-out
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        ></div>
        <div
          className={`
            ${sizeClasses[size].circle} 
            absolute left-0.5 top-0.5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out
            ${isChecked ? sizeClasses[size].translateX : 'translate-x-0'}
          `}
        ></div>
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};

export default Toggle;