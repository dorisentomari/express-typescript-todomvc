import { formatTime } from 'src/helper/time';

const commonFields = {
  deleted: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  createTime: {
    type: Date,
    default: new Date(),
    get: (time: string) => formatTime(time)
  },
  updateTime: {
    type: Date,
    default: new Date(),
    get: (time: string) => formatTime(time)
  },
  remark: {
    type: String,
    default: ''
  }
};

export default commonFields;
