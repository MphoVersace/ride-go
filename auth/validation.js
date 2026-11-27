export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export const normalizeEmail = (value) => value.trim().toLowerCase();

export function normalizePhone(value) {
  const compact = value.trim().replace(/[\s().-]/g, '');
  if (/^0\d{9}$/.test(compact)) return `+27${compact.slice(1)}`;
  if (/^\+270\d{9}$/.test(compact)) return `+27${compact.slice(4)}`;
  if (/^\+27\d{9}$/.test(compact)) return compact;
  if (/^\+(?!27)[1-9]\d{6,14}$/.test(compact)) return compact;
  return null;
}

export const passwordRules = [
  ['At least 8 characters', (value) => [...value].length >= 8],
  ['An uppercase letter and a lowercase letter', (value) => /\p{Lu}/u.test(value) && /\p{Ll}/u.test(value)],
  ['A number', (value) => /\p{Nd}/u.test(value)],
  ['A symbol such as !, @ or #', (value) => /[\p{P}\p{S}]/u.test(value)],
];
