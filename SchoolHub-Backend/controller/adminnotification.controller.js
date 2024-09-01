const modeladminnotification = require("../models/adminnotification");
const config = require("../config/index");

//Register
const newadminNotification = async (req, res) => {
  try {
    const {date,photo, ...rest } = req.body;

    const formatDate = (date) => {
      const formattedDate = new Date(date);
      const day = formattedDate.getDate();
      const month = formattedDate.toLocaleString("default", { month: "short" });
      const year = formattedDate.getFullYear();
      return `${day} ${month} ${year}`;
    };

    const newreg = new modeladminnotification({
      photo: req.files && req.files.photo[0].filename,
      date : formatDate(date),
      ...rest,
    });
    await newreg.save();
    return res
      .status(200)
      .json({ status: true, message: "Registered Successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ status: false, message: "Failed to register notification" });
  }
};

//Update
const adminnotificationUpdate = async (req, res) => {
  const id = req.params.id;
  const { ...rest } = req.body;
  try {
    const update = await modeladminnotification.findByIdAndUpdate(
      id,
      { ...rest },
      { new: true }
    );

    if (!update) {
      res.status(400).json({ message: " User not found" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Update Unsuccessfully" });
  }
  return res
    .status(200)
    .json({ status: true, message: "Update Successfully", update });
};

//Display
const adminnotificationDisplay = async (req, res) => {
  const id = req.params.id;
  let Display;
  try {
    Display = await modeladminnotification.find();
  } catch (error) {
    return res
      .status(400)
      .json({
        status: false,
        message: "Someting error",
      });
  }
  return res
    .status(200)
    .json({
      status: true,
      message: "Notification are showing",
      result: Display,
      imageUrl: config.IMAGE.AdminnotificationPhoto_FILE_URL_PATH,

    });
};

//DisplayById
const adminnotificationDisplaybyId = async (req, res) => {
  const id = req.params.id;
  console.log(id, "id");
  let Display;
  try {
    Display = await modeladminnotification.findOne({ _id: id });
  } catch (error) {
    return res.status(400).json({ status: false, message: "Someting error" });
  }
  return res
    .status(200)
    .json({
      status: true,
      message: "Notification are showing",
      result: Display,
    });
};

//Delete
const adminnotificationDelete = async (req, res) => {
  const id = req.params.id;
  let Delete;
  try {
    Delete = await modeladminnotification.findByIdAndDelete({ _id: id });
  } catch (error) {
    return res.status(400).json({ status: false, message: "Someting error" });
  }
  return res
    .status(200)
    .json({
      status: true,
      message: "Notification are Deleted Successfully",
      result: Delete,
    });
};

module.exports = {
  newadminNotification,
  adminnotificationUpdate,
  adminnotificationDisplay,
  adminnotificationDelete,
  adminnotificationDisplaybyId,
};
