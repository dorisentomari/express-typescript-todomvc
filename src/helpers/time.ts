import moment from 'moment';

export const formatTime = (time: Date | string, hasTime:boolean = true)  => {
  const newTime:string = moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
  const [date, _time] = newTime.split(' ');
  if (hasTime) {
    return `${date} ${_time}`;
  }
  return date;
};
