import React, { useState, useEffect } from 'react';
import { KeyRound, ExternalLink } from 'lucide-react';
import PasswordDisplay from './PasswordDisplay';
import PasswordControls from './PasswordControls';
import PasswordStrength from './PasswordStrength';
import PasswordHistory from './PasswordHistory';
import { generatePassword, calculatePasswordStrength, type PasswordOptions } from '../utils/passwordUtils';

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeAmbiguous: false,
};

const PasswordGenerator: React.FC = () => {
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [password, setPassword] = useState<string>('');
  const [strength, setStrength] = useState({ score: 0, label: '', color: '' });
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    generateNewPassword();
  }, [options]);

  useEffect(() => {
    if (password) {
      setStrength(calculatePasswordStrength(password, options));
    }
  }, [password, options]);

  const generateNewPassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    if (!history.includes(newPassword)) {
      setHistory(prev => [newPassword, ...prev].slice(0, 10));
    }
  };

  const handleOptionsChange = (newOptions: PasswordOptions) => {
    setOptions(newOptions);
  };

  const handleCopyFromHistory = (password: string) => {
    navigator.clipboard.writeText(password);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-gradient-to-bl from-blue-50 to-indigo-50 rounded-xl shadow-lg font-vazir">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <div className="bg-blue-500 p-3 rounded-full inline-flex items-center justify-center">
            <KeyRound size={24} className="text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">ابزار تولید رمز عبور امن</h1>
        <p className="text-gray-600 mt-2">رمزهای عبور تصادفی و قوی برای حفظ امنیت حساب‌های شما</p>
      </div>


      <div className="bg-white rounded-lg p-4 shadow-md mb-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src="https://shayanloo.ir/wp-content/uploads/elementor/thumbs/icon-512-xa-qwpewol976g2i6unf8lmb5lwjug6vhpwl9t7f8yu1o.png"
            alt="Poolakoo Logo"
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-gray-800 font-semibold mb-1">حسابداری، پرتفوی و قیمت ارز</h3>
            <p className="text-gray-600 text-sm leading-relaxed">دانلود رایگان اپلیکیشن پولاکو برای موبایل!</p>
          </div>
          <a href="https://shayanloo.ir/poolakou/" target="_blank" rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors flex items-center gap-1 whitespace-nowrap self-start sm:self-center">
            مشاهده
            <ExternalLink size={14} className="inline" />
          </a>

        </div>
      </div>


      <PasswordDisplay
        password={password}
        onRegenerate={generateNewPassword}
      />


      <PasswordStrength strength={strength} />

      <PasswordControls
        options={options}
        onChange={handleOptionsChange}
      />

      <PasswordHistory
        history={history}
        onCopy={handleCopyFromHistory}
        onClear={clearHistory}
      />

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>رمزهای عبور به صورت محلی تولید می‌شوند و هرگز ذخیره یا منتقل نمی‌شوند</p>
      </div>
    </div>
  );
};

export default PasswordGenerator;