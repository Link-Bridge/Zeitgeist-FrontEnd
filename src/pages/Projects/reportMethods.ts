import colors from '../../colors';
/**
 *
 * @param number: number
 * @returns string
 *
 * @description Method to convert a number into a month
 */
export const numberToMonth = (number: number): string => {
  switch (number) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'Jule';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
    default:
      return 'Invalid month number';
  }
};

/**
 *
 * @param status: String
 * @returns string
 *
 * @description Method to convert a status into a color string
 */
export const statusColor = (status: string) => {
  status = status.toUpperCase();

  switch (status) {
    case 'ACCEPTED':
      return colors.lightSuccess;
    case 'NOT STARTED':
      return colors.lightRed;
    case 'IN PROGRESS':
      return colors.warning;
    case 'IN PROCESS':
      return colors.warning;
    case 'UNDER REVISION':
      return colors.purple;
    case 'DELAYED':
      return colors.lightOrange;
    case 'POSTPONED':
      return colors.blue;
    case 'DONE':
      return colors.success;
    case 'CANCELLED':
      return colors.warning;
    case 'IN QUOTATION':
      return colors.darkBlue;
    case 'AREA':
      return colors.extra;
    default:
      return colors.null;
  }
};

/**
 *
 * @param data: string
 * @returns string
 *
 * @description Method to capitalize a string
 */
export const capitalize = (data: string): string => {
  return data.charAt(0).toUpperCase() + data.substring(1).toLowerCase();
};

/**
 *
 * @param date: Date
 * @returns string
 *
 * @description Method to convert a Date into a string (yyyy-mm-dd)
 */
export const filterDateParser = (date: Date): string => {
  const arr = date.toISOString().split('-');
  const day = arr[2].substring(0, 2);
  const month = arr[1];
  const year = arr[0];
  return `${year}-${month}-${day}`;
};
