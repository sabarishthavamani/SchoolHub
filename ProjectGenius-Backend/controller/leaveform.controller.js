const { json } = require("body-parser");
const leave = require("../models/leaverform");
const moment = require("moment");

// http://localhost:3002/admin/leaveapplication

const leaveapplication = async (req, res) => {
  const {
    employeeId,
    name,
    fromDate,
    toDate,
    reason,
    approval,
    active,
    leaveType,
    numofDays,
  } = req.body;

  try {
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate();
      const month = formattedDate.toLocaleString("default", { month: "long" });
      const year = formattedDate.getFullYear();
      return `${day} ${month} ${year}`;
    };

    // Check if fromDate is before toDate
    if (new Date(fromDate) > new Date(toDate)) {
      return res
        .status(400)
        .json({ error: "From Date must be before To Date" });
    }

    const currentDateFormatted = formatDate(new Date());
    const leaveDates = [];
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    while (startDate <= endDate) {
      leaveDates.push({
        date: formatDate(startDate),
        approval: approval,
        leaveType: leaveType,
        month: startDate.toLocaleString("default", { month: "short" }), // Add month here
      });
      startDate.setDate(startDate.getDate() + 1);
    }

    const newLeaveData = {
      currentDate: currentDateFormatted,
      employeeId,
      name,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      numofDays,
      reason,
      approval,
      leaveType,
      reasonDecline: "",
      active,
      leaveDates,
    };

    const existingYear = new Date(fromDate).getFullYear().toString();
    const existingMonth = startDate.toLocaleString("default", { month: "short" }); // Adjust here

    let existingLeaveForm = await leave.findOne({ year: existingYear });

    if (!existingLeaveForm) {
      existingLeaveForm = new leave({ year: existingYear, months: [] });
    }

    let existingMonthIndex = existingLeaveForm.months.findIndex(
      (m) => m.month === existingMonth
    );

    if (existingMonthIndex === -1) {
      existingLeaveForm.months.push({
        month: existingMonth,
        LeaveDataList: [],
      });
      existingMonthIndex = existingLeaveForm.months.length - 1;
    }

    existingLeaveForm.months[existingMonthIndex].LeaveDataList.push(
      newLeaveData
    );

    await existingLeaveForm.save();

    res.status(201).json({
      status: true,
      message: "Leave application submitted successfully",
      result: newLeaveData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



// http://localhost:3002/admin/leaveapplicationupdate/:leaveDataListId/:objectId

const leaveapplicationupdate = async (req, res) => {
  try {
    const { leaveDataListId } = req.params;
    const {
      name,
      reason,
      approval,
      fromDate,
      toDate,
      leaveType,
      reasonDecline,
      numofDays,
    } = req.body;

    const formatDate = (date) => {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate();
      const monthIndex = formattedDate.getMonth();
      const year = formattedDate.getFullYear();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${day} ${months[monthIndex]} ${year}`;
    };

    // Find the leave document containing the specified leaveDataListId
    const leaveDoc = await leave.findOne({
      "months.LeaveDataList._id": leaveDataListId,
    });

    if (!leaveDoc) {
      return res.status(404).json({
        status: false,
        message: `No data found for the provided leaveDataListId ${leaveDataListId}`,
      });
    }

    // Find the selected leave data within the leave document
    const selectedLeaveData = leaveDoc.months.reduce(
      (selectedData, month) =>
        month.LeaveDataList.find((data) => data._id.toString() === leaveDataListId) ||
        selectedData,
      null
    );

    if (!selectedLeaveData) {
      return res.status(404).json({
        status: false,
        message: `No data found for the provided leaveDataListId ${leaveDataListId}`,
      });
    }

    // Update fields
    if (name) selectedLeaveData.name = name;
    if (numofDays) selectedLeaveData.numofDays = numofDays;
    if (reason) selectedLeaveData.reason = reason;
    if (approval) selectedLeaveData.approval = approval;
    if (fromDate) {
      selectedLeaveData.fromDate = formatDate(fromDate); // Format fromDate
    }
    if (toDate) {
      selectedLeaveData.toDate = formatDate(toDate); // Format toDate
      if (fromDate) {
        const start = new Date(fromDate);
        const end = new Date(toDate);
        const timeDifference = end.getTime() - start.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);
        selectedLeaveData.numofDays = daysDifference + 1;
      }
    }
    if (leaveType) selectedLeaveData.leaveType = leaveType;
    if (reasonDecline) selectedLeaveData.reasonDecline = reasonDecline;

    // Update leave dates
    if (fromDate || toDate) {
      const leaveDates = [];
      const startDate = new Date(selectedLeaveData.fromDate);
      const endDate = new Date(selectedLeaveData.toDate);
      while (startDate <= endDate) {
        leaveDates.push({
          date: formatDate(startDate),
          approval: selectedLeaveData.approval,
          leaveType: selectedLeaveData.leaveType,
        });
        startDate.setDate(startDate.getDate() + 1);
      }
      selectedLeaveData.leaveDates = leaveDates;
    }

    // Save the updated leave document
    await leaveDoc.save();

    res.json(selectedLeaveData);
  } catch (error) {
    console.error("Error updating leave application:", error);
    res.status(500).json({ message: "Failed to update leave application" });
  }
};



// http://localhost:3002/admin/leaveDisplay

const leaveDisplay = async (req, res) => {
  let Display;
  try {
    Display = await leave.find({});
    return res.status(200).json({ status: true, result: Display });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: false, message: "Decline" });
  }
};

// http://localhost:3002/admin/leaveapplicationDelete

const leaveapplicationDelete = async (req, res) => {
  let Delete;
  const id = req.params.id;
  try {
    Delete = await leave.findByIdAndDelete({ _id: id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: false, message: "Decline" });
  }
  res.status(200).json({ status: true, message: "Deleted Successfully" });
};

// http://localhost:3002/admin/Leavelistmonth

const Leavelistmonth = async (req, res) => {
  try {
    const leaveData = await leave.findOne();
    const monthsList = leaveData.months.map((month) => month.month);
    return res.status(200).json({ status: true, result: monthsList });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, error: "Internal Server Error" });
  }
};

// http://localhost:3002/admin/leaveformDislay/:month

const leaveformDislay = async (req, res) => {
  try {
    const selectedMonth = req.params.month;

    const leaveDoc = await leave.findOne({});
    console.log("leaveDoc----------", leaveDoc);

    if (!leaveDoc) {
      return res
        .status(404)
        .json({ status: false, message: "No data found for the provided ID" });
    }

    const selectedMonthData = leaveDoc.months.find(
      (entry) => entry.month === selectedMonth
    );

    console.log("selectedMonthData....", selectedMonthData);

    if (!selectedMonthData) {
      return res.status(404).json({
        status: false,
        message: `No data found for the month: ${selectedMonth}`,
      });
    }

    return res
      .status(200)
      .json({ status: true, result: selectedMonthData.LeaveDataList });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

module.exports = {
  leaveapplication,
  leaveDisplay,
  leaveapplicationDelete,
  leaveapplicationupdate,
  Leavelistmonth,
  leaveformDislay,
};
