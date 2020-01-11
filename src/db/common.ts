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

export default commonFields;
