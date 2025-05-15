import React from 'react';

type PasswordStrengthProps = {
  strength: {
    score: number;
    label: string;
    color: string;
  };
};

const strengthLabels = {
  'Too Weak': 'خیلی ضعیف',
  'Weak': 'ضعیف',
  'Medium': 'متوسط',
  'Strong': 'قوی',
  'Very Strong': 'خیلی قوی'
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength }) => {
  const persianLabel = strengthLabels[strength.label as keyof typeof strengthLabels] || strength.label;
  
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">قدرت: {persianLabel}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${strength.color}`} 
          style={{ width: `${strength.score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrength;