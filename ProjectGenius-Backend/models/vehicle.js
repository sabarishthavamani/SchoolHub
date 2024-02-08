const mongoose = require("mongoose");
const schema = mongoose.Schema;
const useschema = new schema({
  vehicleNumber: {
    type: String,
    require: true,
  },
  vehicleRegisterNumber: {
    type: String,
    require: true,
  },
  vehicleType: {
    type: String,
    require: true,
  },
  manufacturer: {
    type: String,
    require: true,
  },
  seatingCapacity: {
    type: String,
    require: true,
  },
  ownerName: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  registrationDate: {
    type: String,
    require: true,
  },
  mileage: {
    type: String,
    require: true,
  },
  pollutionCertificate: {
    
    type: String,
    require: true,
  },
  pollutionTestedDate: {
    type: String,
    require: true,
  },
  pollutionValidityDate: {
    type: String,
    require: true,
  },
  insurance: {
    type: String,
    require: true,
  },
  insuranceStartDate: {
    type: String,
    require: true,
  },
  insuranceEndDate: {
    type: String,
    require: true,
  },
  isSpeedGovernorInstalled: {
    type: String,
    require: true,
  },
  speedLimit: {
    type: String,
    require: true,
  },
  fitnessCertificateNumber: {
    type: String,
    require: true,
  },
  fitnessTestedDate: {
    type: String,
    require: true,
  },
  accidentClaimsInfo: {
    type: String,
    require: true,
  },
  serviceHistoryDetails: {
    type: String,
    require: true,
  },
  usageType: {
    type: String,
    require: true,
  },
  vehicleRoute: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Vehicle", useschema);
