import { formatTime } from '../helpers/time';

export const commonFields = {
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
    default: new Date()
  },
  updateTime: {
    type: Date,
    default: new Date()
  },
  remark: {
    type: String,
    default: ''
  }
};


const commonTOObjectJSON = (ret) => {
  ret.id = ret._id;
  ret.createTime = formatTime(ret.createTime);
  ret.updateTime = formatTime(ret.updateTime);
  delete ret.deleted;
  delete ret.__v;
  delete ret._id;
};

export const commonOptions = {
  toObject: {
    transform: function (doc, ret) {
      commonTOObjectJSON(ret);
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      commonTOObjectJSON(ret);
    }
  }
};

