/**
 *
 * @param email: string
 * @returns boolean
 *
 * @description Method to validate an email using regex
 */
export const validEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,}$/;
  return regex.test(email);
};

/**
 *
 * @param rfc: string
 * @returns boolean
 *
 * @description Method to validate a RFC using regex
 */
export const validRFC = (rfc: string): boolean => {
  const regex = /^[a-zA-Z]{3,4}[0-9]{6}[a-zA-Z0-9]{3}$/;
  return regex.test(rfc);
};

/**
 *
 * @param text: string
 * @returns string Truncated text
 *
 * @description Method to truncate a text which lenght is greater than 50 chars
 */
export const truncateText = (text: string | undefined | null, maxLength: number = 50): string => {
  if (!text) return '';
  if (text.length > maxLength) return text.substring(0, maxLength) + '...';
  return text;
};
