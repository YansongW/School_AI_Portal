import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

export const formatDate = (date: string | number | Date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

export const formatDateTime = (date: string | number | Date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const fromNow = (date: string | number | Date) => {
  return dayjs(date).fromNow();
};

export const isToday = (date: string | number | Date) => {
  return dayjs(date).isSame(dayjs(), 'day');
};

export const addDays = (date: string | number | Date, days: number) => {
  return dayjs(date).add(days, 'day').toDate();
}; 