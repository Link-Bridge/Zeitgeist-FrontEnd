import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export function configDayjs() {
  dayjs.extend(utc);
}
