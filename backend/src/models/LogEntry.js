const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNum = {
  type: Number,
  required: true,
};

const logEntrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    comments: String,
    image: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    longitude: {
      ...requiredNum,
      min: -180,
      max: 180,
    },
    latitude: {
      ...requiredNum,
      min: -90,
      max: 90,
    },
    visitDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;
