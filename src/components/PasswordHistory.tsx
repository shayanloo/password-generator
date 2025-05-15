import React from 'react';
import { ClipboardCopy } from 'lucide-react';

type PasswordHistoryProps = {
  history: string[];
  onCopy: (password: string) => void;
  onClear: () => void;
};

const PasswordHistory: React.FC<PasswordHistoryProps> = ({ 
  history, 
  onCopy,
  onClear
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-5 shadow-md mt-5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700">رمزهای تولید شده</h3>
        <button 
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-700 transition-colors"
        >
          پاک کردن تاریخچه
        </button>
      </div>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {history.map((password, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
            <span className="font-mono text-sm truncate max-w-[80%] text-left" dir="ltr">
              {password.replace(/./g, '•')}
            </span>
            <button
              onClick={() => onCopy(password)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="کپی در کلیپ‌بورد"
            >
              <ClipboardCopy size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordHistory;