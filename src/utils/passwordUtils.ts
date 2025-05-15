export type PasswordOptions = {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
};

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const ambiguousChars = '1lI0oO';

export const generatePassword = (options: PasswordOptions): string => {
  let chars = '';
  let password = '';

  if (options.includeUppercase) chars += uppercaseChars;
  if (options.includeLowercase) chars += lowercaseChars;
  if (options.includeNumbers) chars += numberChars;
  if (options.includeSymbols) chars += symbolChars;

  // Remove ambiguous characters if specified
  if (options.excludeAmbiguous) {
    for (const char of ambiguousChars) {
      chars = chars.replace(char, '');
    }
  }

  // Default to lowercase if nothing is selected
  if (chars === '') chars = lowercaseChars;

  // Generate password
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  return password;
};

export const calculatePasswordStrength = (
  password: string,
  options: PasswordOptions
): { score: number; label: string; color: string } => {
  if (!password) return { score: 0, label: 'Too Weak', color: 'bg-red-500' };

  let score = 0;
  
  // Length contribution (up to 40% of total score)
  score += Math.min(password.length * 2, 40);
  
  // Character set contribution (up to 60% of total score)
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  
  if (hasUpper) score += 15;
  if (hasLower) score += 15;
  if (hasNumber) score += 15;
  if (hasSymbol) score += 15;
  
  // Penalize for single character type
  if (score <= 40) score = Math.min(score, 25);

  // Map score to label and color
  if (score < 30) return { score, label: 'Too Weak', color: 'bg-red-500' };
  if (score < 50) return { score, label: 'Weak', color: 'bg-orange-500' };
  if (score < 70) return { score, label: 'Medium', color: 'bg-yellow-500' };
  if (score < 90) return { score, label: 'Strong', color: 'bg-green-500' };
  return { score, label: 'Very Strong', color: 'bg-emerald-600' };
};