import React from 'react';
import { PasswordOptions } from '../utils/passwordUtils';

type PasswordControlsProps = {
  options: PasswordOptions;
  onChange: (options: PasswordOptions) => void;
};


const PasswordControls: React.FC<PasswordControlsProps> = ({
  options, onChange
}) => {
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(e.target.value);
    onChange({ ...options, length: newLength });
  };

  const handleToggleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: keyof PasswordOptions
  ) => {
    onChange({ ...options, [option]: e.target.checked });
  };

  return (
    <div className="bg-white rounded-lg p-5 shadow-md">
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="length" className="text-sm font-medium text-gray-700">
            طول رمز عبور: <span className="text-blue-600 font-semibold">{options.length}</span>
          </label>
        </div>
        <input
          id="length"
          type="range"
          min="5"
          max="50"
          value={options.length}
          onChange={handleLengthChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>۵</span>
          <span>۲۵</span>
          <span>۵۰</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 mb-2">انواع کاراکتر</h3>

        <div className="flex items-center">
          <input
            id="includeLowercase"
            type="checkbox"
            checked={options.includeLowercase}
            onChange={(e) => handleToggleChange(e, 'includeLowercase')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="includeLowercase" className="mr-2 text-sm text-gray-700">
            شامل حروف کوچک (a-z)
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="includeUppercase"
            type="checkbox"
            checked={options.includeUppercase}
            onChange={(e) => handleToggleChange(e, 'includeUppercase')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="includeUppercase" className="mr-2 text-sm text-gray-700">
            شامل حروف بزرگ (A-Z)
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="includeNumbers"
            type="checkbox"
            checked={options.includeNumbers}
            onChange={(e) => handleToggleChange(e, 'includeNumbers')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="includeNumbers" className="mr-2 text-sm text-gray-700">
            شامل اعداد (۰-۹)
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="includeSymbols"
            type="checkbox"
            checked={options.includeSymbols}
            onChange={(e) => handleToggleChange(e, 'includeSymbols')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="includeSymbols" className="mr-2 text-sm text-gray-700">
            شامل نمادها (!@#$%^&*)
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="excludeAmbiguous"
            type="checkbox"
            checked={options.excludeAmbiguous}
            onChange={(e) => handleToggleChange(e, 'excludeAmbiguous')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="excludeAmbiguous" className="mr-2 text-sm text-gray-700">
            حذف کاراکترهای مشابه (1, l, I, 0, O)
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordControls;