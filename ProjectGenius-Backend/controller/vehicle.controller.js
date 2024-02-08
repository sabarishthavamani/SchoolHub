const Vehicle = require("../models/vehicle");
const mongoose = require("mongoose");

// http://localhost:3002/admin/vehicleadmission

const VehiclePost = async (req, res) => {
  const pollutionCertificateFile = req.files && req.files.pollutionCertificate ? req.files.pollutionCertificate[0].filename : null;
  const insuranceFile = req.files && req.files.insurance ? req.files.insurance[0].filename : null;
  
  const maxTeacher = await Vehicle.findOne({}, { vehicleNumber: 1 }).sort({ vehicleNumber: -1 });
  let nextvehicleNumber = 'V0001';

  if (maxTeacher && maxTeacher.vehicleNumber) {
      const currentMaxId = maxTeacher.vehicleNumber;
      const seriesNumber = parseInt(currentMaxId.substring(1), 10) + 1;
      nextvehicleNumber = `V${seriesNumber.toString().padStart(4, '0')}`;
  }

  let NewRegister = new Vehicle({
    'vehicleNumber': nextvehicleNumber,
    'vehicleType': req.body.vehicleType,
    'vehicleRegisterNumber': req.body.vehicleRegisterNumber,
    'manufacturer': req.body.manufacturer,
    'seatingCapacity': req.body.seatingCapacity,
    'status': req.body.status,
    'ownerName': req.body.ownerName,
    'registrationDate': req.body.registrationDate,
    'mileage': req.body.mileage,
    'pollutionCertificate': pollutionCertificateFile,
    'pollutionTestedDate': req.body.pollutionTestedDate,
    'pollutionValidityDate': req.body.pollutionValidityDate,
    'insurance': insuranceFile,
    'insuranceStartDate': req.body.insuranceStartDate,
    'insuranceEndDate': req.body.insuranceEndDate,
    'isSpeedGovernorInstalled': req.body.isSpeedGovernorInstalled,
    'speedLimit': req.body.speedLimit,
    'fitnessCertificateNumber': req.body.fitnessCertificateNumber,
    'fitnessTestedDate': req.body.fitnessTestedDate,
    'accidentClaimsInfo': req.body.accidentClaimsInfo,
    'serviceHistoryDetails': req.body.serviceHistoryDetails,
    'usageType': req.body.usageType,
    'vehicleRoute': req.body.vehicleRoute,
  });

  try {
    await NewRegister.save();
    return res.status(200).json({ 'status': "Vehicle Details Added Successfully", NewRegister });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': 'Internal Server Error' });
  }
};

// http://localhost:3002/admin/VehicleDetails

const VehicleDetails = async (req, res) => {
  let Display;
  try {
    Display = await Vehicle.findById({_id:id});
  } catch (err) {
    console.log(err);
  }
  if (!Display) {
    return res.status(404).json({ message: "Page Error" });
  }
  return res.status(200).json({ Display });
};

// http://localhost:3002/admin/VehicleDetailById/:id

const VehicleDetailById = async (req, res) => {
  let Display;
  const id = req.body.id;
  try {
    Display = await Vehicle.find();
  } catch (err) {
    console.log(err);
  }
  if (!Display) {
    return res.status(404).json({ message: "Page Error" });
  }
  return res.status(200).json({ Display });
};

// http://localhost:3002/admin/VehicleDetailUpdate/:id

const VehicleDetailUpdate = async (req, res) => {
  const id = req.params.id;
  const {
    vehicleNumber,
    vehicleRegisterNumber,
    manufacturer,
    seatingCapacity,
    status,
    ownerName,
    registrationDate,
    mileage,
    pollutionCertificate,
    pollutionTestedDate,
    pollutionValidityDate,
    insurance,
    insuranceStartDate,
    insuranceEndDate,
    isSpeedGovernorInstalled,
    speedLimit,
    fitnessCertificateNumber,
    fitnessTestedDate,
    accidentClaimsInfo,
    serviceHistoryDetails,
    usageType,
    vehicleRoute,
  } = req.body;

  const UpdateVehicle = await Vehicle.findByIdAndUpdate(
    id,
    {
        vehicleNumber,
        vehicleRegisterNumber,
        manufacturer,
        seatingCapacity,
        status,
        ownerName,
        registrationDate,
        mileage,
        pollutionCertificate,
        pollutionTestedDate,
        pollutionValidityDate,
        insurance,
        insuranceStartDate,
        insuranceEndDate,
        isSpeedGovernorInstalled,
        speedLimit,
        fitnessCertificateNumber,
        fitnessTestedDate,
        accidentClaimsInfo,
        serviceHistoryDetails,
        usageType,
        vehicleRoute,
    },
    { new: true }
  );

  if (!UpdateVehicle) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ UpdateVehicle });
};

// http://localhost:3002/admin/VehicleDetailDelete/:id

const VehicleDetailDelete = async (req, res) => {
  let Delete;
  const id = req.params.id;
  try {
    Delete = await Vehicle.findByIdAndDelete({ _id: id });
  } catch (err) {
    console.log(err);
  }
  if (!Delete) {
    return res
      .status(404)
      .json({ message: "VehicleDetali Has Deleted Already" });
  }
  res.status(200).json(Delete);
};

exports.VehiclePost = VehiclePost;
exports.VehicleDetails = VehicleDetails;
exports.VehicleDetailUpdate = VehicleDetailUpdate;
exports.VehicleDetailDelete = VehicleDetailDelete;
exports.VehicleDetailById = VehicleDetailById;