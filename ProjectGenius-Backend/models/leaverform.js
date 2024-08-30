const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaveDateSchema = new Schema({
  date: String,
  approval: String,
  leaveType: String,
});

const leaveSchema = new Schema({
  year: String,
  months: [
    {
      month: {
        type: String,
        required: true,
      },
      LeaveDataList: [
        {
          currentDate: String,
          employeeId: String,
          name: String,
          fromDate: String,
          toDate: String,
          numofDays: String,
          reason: String,
          approval: String,
          leaveType: String,
          reasonDecline: String,
          active: {
            type: Number,
            default: 1,
          },
          leaveDates: [leaveDateSchema],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("LeaveForm", leaveSchema);
