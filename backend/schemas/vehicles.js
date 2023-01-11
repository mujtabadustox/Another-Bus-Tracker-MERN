const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const vehicles = new mongoose.Schema({
  vid: String,
  tmstmp: String,
  lat: String,
  lon: String,
  hdg: String,
  pid: Number,
  rt: String,
  des: String,
  pdist: Number,
  dly: Boolean,
  tatripid: String,
  origtatripno: String,
  tablockid: String,
  zone: String,
  speed: Number,
});

const vehiclesS = mongoose.model("vehicle", vehicles);
module.exports = vehiclesS;
