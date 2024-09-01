const TeacherMonthlyAttendance = require("../models/teachermonthlyatt");
const Leave = require("../models/leaverform");

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// http://localhost:3002/admin/createMonthAttendance

const createMonthAttendance = async (req, res) => {
  const { year, month } = req.body;
  const monthOrder = [
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

  try {
    let existingPayroll = await TeacherMonthlyAttendance.findOne({ year });
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate();
      const month = formattedDate.toLocaleString("default", { month: "long" });
      const year = formattedDate.getFullYear();
      return `${day} ${month} ${year}`;
    };

    if (existingPayroll) {
      const existingMonthIndex = existingPayroll.months.findIndex(
        (m) => m.month === month
      );

      if (existingMonthIndex !== -1) {
        existingPayroll.months[existingMonthIndex].EmployeMonthlyAttendance =
          req.body.EmployeMonthlyAttendance.map((employee) => {
            const dates = [];
            const daysInMonth = getDaysInMonth(year, monthOrder.indexOf(month));
            for (let i = 1; i <= daysInMonth; i++) {
              dates.push(
                `${year}-${monthOrder.indexOf(month) + 1}-${i
                  .toString()
                  .padStart(2, "0")}`
              );
            }

            return {
              name: employee.name,
              employeeId: employee.employeeId,
              days: dates.map((date) => ({
                date: formatDate(date),
                status: "Present",
                leaveType: "normal",
                approval: "normal",
              })),
            };
          });

        await existingPayroll.save();

        res.status(200).json({
          status: true,
          message: "Payroll data updated successfully",
          payroll: existingPayroll,
        });
      } else {
        const newMonthData = {
          month: month,
          EmployeMonthlyAttendance: req.body.EmployeMonthlyAttendance.map(
            (employee) => {
              const dates = [];
              const daysInMonth = getDaysInMonth(
                year,
                monthOrder.indexOf(month)
              );
              for (let i = 1; i <= daysInMonth; i++) {
                const date = new Date(year, monthOrder.indexOf(month), i);
                const formattedDate = date.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                });
                dates.push(formattedDate);
              }

              return {
                name: employee.name,
                employeeId: employee.employeeId,
                days: dates.map((date) => ({
                  date: formatDate(date),
                  status: "Present",
                  leaveType: "normal",
                  approval: "normal",
                })),
              };
            }
          ),
        };

        existingPayroll.months.push(newMonthData);
        existingPayroll.months.sort(
          (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        );
        await existingPayroll.save();

        res.status(200).json({
          status: true,
          message: "New month data added successfully",
          payroll: existingPayroll,
        });
      }
    } else {
      const newPayroll = new TeacherMonthlyAttendance({
        year: year,
        months: [
          {
            month: month,
            EmployeMonthlyAttendance: req.body.EmployeMonthlyAttendance.map(
              (employee) => {
                const dates = [];
                const daysInMonth = getDaysInMonth(
                  year,
                  monthOrder.indexOf(month)
                );
                for (let i = 1; i <= daysInMonth; i++) {
                  dates.push(
                    `${year}-${monthOrder.indexOf(month) + 1}-${i
                      .toString()
                      .padStart(2, "0")}`
                  );
                }

                return {
                  name: employee.name,
                  employeeId: employee.employeeId,
                  days: dates.map((date) => ({
                    date: formatDate(date),
                    status: "Present",
                    leaveType: "normal",
                  })),
                };
              }
            ),
          },
        ],
      });

      const savedPayroll = await newPayroll.save();
      res.status(201).json({
        status: true,
        message: "New payroll data created successfully",
        payroll: savedPayroll,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// http://localhost:3002/admin/employeeDisplay/:month/:date

const employeeDisplay = async (req, res) => {
  try {
    const selectedMonth = req.params.month;
    const selectedDate = req.params.date;

    const monthlyAtt = await TeacherMonthlyAttendance.findOne({});
    const leaveForm = await Leave.findOne({});

    if (!leaveForm) {
      console.log("No leave data found");
    }

    const selectedMonthData = monthlyAtt.months.find(
      (entry) => entry.month === selectedMonth
    );

    if (!selectedMonthData) {
      return res.status(404).json({
        status: false,
        message: `No data found for the month: ${selectedMonth}`,
      });
    }

    selectedMonthData.EmployeMonthlyAttendance.forEach((employee) => {
      const leaveFormMonth = leaveForm?.months.find(
        (month) => month.month === selectedMonth
      );
      const leaveApproval = leaveFormMonth?.LeaveDataList.find(
        (leave) =>
          leave.employeeId === employee.employeeId &&
          leave.leaveDates &&
          leave.leaveDates.some(
            (date) => date.date === selectedDate && date.approval === "Accept"
          )
      );

      if (
        leaveFormMonth &&
        leaveApproval &&
        leaveApproval.approval === "Accept"
      ) {
        const dayData = employee.days.find((day) => day.date === selectedDate);
        if (dayData) {
          dayData.status = "Absent";
          dayData.leaveType = leaveApproval.leaveType || "normal";
          dayData.approval = leaveApproval.approval;
        }
      } else {
        const dayData = employee.days.find((day) => day.date === selectedDate);
        if (dayData) {
          dayData.status = dayData.status || "Present";
          dayData.leaveType = dayData.leaveType || "normal";
          dayData.approval = dayData.approval || "normal";
        }
      }
    });

    await monthlyAtt.save();

    const employeeDataForDate = selectedMonthData.EmployeMonthlyAttendance
      .filter((employee) =>
        employee.days.some((day) => day.date === selectedDate)
      )
      .map((employee) => {
        const dayData = employee.days.find((day) => day.date === selectedDate);
        return {
          name: employee.name,
          employeeId: employee.employeeId,
          dayData: {
            date: selectedDate,
            status: dayData.status,
            leaveType: dayData.leaveType,
            approval: dayData.approval,
          },
        };
      });

    return res.status(200).json({
      status: true,
      result: employeeDataForDate,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

// http://localhost:3002/admin/selectedmonthDisplay/:month

const selectedmonthDisplay = async (req, res) => {
  try {
    const selectedMonth = req.params.month;

    const monthlyAtt = await TeacherMonthlyAttendance.findOne({});

    if (!monthlyAtt) {
      return res.status(404).json({
        status: false,
        message: "Teacher monthly attendance data not found",
      });
    }

    const selectedMonthData = monthlyAtt.months.find(
      (entry) => entry.month === selectedMonth
    );

    if (!selectedMonthData) {
      return res.status(404).json({
        status: false,
        message: `No data found for the month: ${selectedMonth}`,
      });
    }

    const employeeDataForMonth = selectedMonthData.EmployeMonthlyAttendance.map(
      (employee) => ({
        name: employee.name,
        employeeId: employee.employeeId,
        days: employee.days.map((day) => ({
          date: day.date,
          status: day.status || "Present",
          leaveType: day.leaveType || "normal",
          approval: day.approval || "normal",
        })),
      })
    );

    return res.status(200).json({
      status: true,
      result: employeeDataForMonth,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

// http://localhost:3002/admin/EmployeeAttendanceUpdate/:month/:date

const EmployeeAttendanceUpdate = async (req, res) => {
  try {
    const { status, leaveType, approval } = req.body;
    const selectedMonth = req.params.month;
    const selectedDate = req.params.date;
    const employeeId = req.params.employeeId;

    const monthlyAtt = await TeacherMonthlyAttendance.findOne({});

    if (!monthlyAtt) {
      return res.status(404).json({
        status: false,
        message: `No monthly attendance data found`,
      });
    }

    const selectedMonthData = monthlyAtt.months.find(
      (entry) => entry.month === selectedMonth
    );

    if (!selectedMonthData) {
      return res.status(404).json({
        status: false,
        message: `No data found for the month: ${selectedMonth}`,
      });
    }

    let updated = false;
    let employeeAttendanceData = null;

    for (const employeeAttendance of selectedMonthData.EmployeMonthlyAttendance) {
      if (employeeAttendance.employeeId === employeeId) {
        const dayData = employeeAttendance.days.find(
          (day) => day.date === selectedDate
        );
        if (dayData) {
          if (status !== undefined) {
            dayData.status = status;
            if (status === 'Present') {
              dayData.leaveType = 'normal'; 
              dayData.approval = 'normal'; 
            } else if (status === 'Absent') {
              dayData.leaveType = 'LOP'; 
              dayData.approval = 'Accept'; 
            } else if (status === 'Holiday') {
              dayData.status = 'Holiday'
              dayData.leaveType = 'normal'; 
              dayData.approval = 'normal'; 
            } else {
              if (leaveType !== undefined) {
                dayData.leaveType = leaveType;
              }
              if (approval !== undefined) {
                dayData.approval = approval;
              }
            }
          }          
          updated = true;
          employeeAttendanceData = dayData;
          break;
        }
      }
    }
    
    

    if (!updated) {
      return res.status(404).json({
        status: false,
        message: `No attendance data found for employeeId: ${employeeId} and date: ${selectedDate}`,
      });
    }

    // Save the changes to the database
    await monthlyAtt.save();

    return res.status(200).json({
      status: true,
      employeeAttendanceData,
      message: `Attendance data updated successfully for employeeId: ${employeeId} and date: ${selectedDate}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};

// http://localhost:3002/admin/displayoverall

const displayoverall = async (req, res) => {
  try {
    const monthlyAtt = await TeacherMonthlyAttendance.findOne({});

    if (!monthlyAtt) {
      return res.status(404).json({
        status: false,
        message: "Teacher monthly attendance data not found",
      });
    }

    const employeeDataForAllMonths = monthlyAtt.months.flatMap((entry) =>
      entry.EmployeMonthlyAttendance.map((employee) => ({
        month: entry.month,
        name: employee.name,
        employeeId: employee.employeeId,
        days: employee.days.map((day) => ({
          date: day.date,
          status: day.status || "Present",
          leaveType: day.leaveType || "normal",
          approval: day.approval || "normal",
        })),
      }))
    );

    return res.status(200).json({
      status: true,
      result: employeeDataForAllMonths,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};



module.exports = {
  createMonthAttendance,
  employeeDisplay,
  EmployeeAttendanceUpdate,
  selectedmonthDisplay,
  displayoverall
};
