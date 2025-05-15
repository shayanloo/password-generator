import React, { useState } from 'react';
import { ClipboardCopy, Eye, EyeOff } from 'lucide-react';

type PasswordDisplayProps = {
  password: string;
  onRegenerate: () => void;
};

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ 
  password, 
  onRegenerate 
}) => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-5 relative">
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={password}
          readOnly
          className="w-full bg-gray-50 border-0 text-xl font-mono py-3 pr-4 pl-20 rounded focus:outline-none text-left"
          dir="ltr"
        />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            onClick={toggleVisibility}
            className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors p-2"
            aria-label={visible ? "پنهان کردن رمز" : "نمایش رمز"}
          >
            {visible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <button
            onClick={copyToClipboard}
            className={`text-gray-500 hover:text-gray-700 focus:outline-none transition-colors p-2 ${
              copied ? "text-green-500" : ""
            }`}
            aria-label="کپی در کلیپ‌بورد"
          >
            <ClipboardCopy size={20} />
          </button>
        </div>
      </div>
      {copied && (
        <div className="absolute -top-10 left-0 bg-green-500 text-white px-3 py-1 rounded shadow-md text-sm animate-fade-in-out">
          کپی شد!
        </div>
      )}
      <button
        onClick={onRegenerate}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      >
        تولید مجدد
      </button>
    </div>
  );
};

export default PasswordDisplay;