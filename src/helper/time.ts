import moment from 'moment';

export const formatTime = (time: Date | string) => {
  return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
};
