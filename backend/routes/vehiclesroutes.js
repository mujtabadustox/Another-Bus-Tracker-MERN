const express = require("express");
const vR = express.Router();
const axios = require("axios");
const vehiclesS = require("../schemas/vehicles");

const veh = async () => {
  const v = [];
  const key = "ujAhaYu9dy6TAF2VgMLWK5nnV";
  const response = await axios.get(
    `https://ctabustracker.com/bustime/api/v2/getvehicles?key=${key}&rt=20&format=json`
  );
  const newResponse = response["data"]["bustime-response"]["vehicle"];
  newResponse.map((item) => {
    let newspeed = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
    Object.assign(item, { speed: newspeed });
    v.push(item);
  });
  //const collections = vehiclesS.insertMany(v);
};
veh();

// READ Vehicles
vR.route("/sendveh").get((req, res, next) => {
  vehiclesS.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

vR.route("/sendoneveh/:rt").get((req, res, next) => {
  vehiclesS.find({ rt: { $eq: req.params.rt } }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

vR.route("/sendonevehspd/:spd").get((req, res, next) => {
  vehiclesS.find({ speed: { $gte: req.params.spd } }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

vR.get("/vehicles/:id", async (req, res) => {
  try {
    const response = await vehiclesS.findById({ _id: req.params.id });
    console.log(response);
    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

vR.post("/vehicles", async (req, res) => {
  const response = new vehiclesS(req.body);
  response.save();
  console.log(response);
  res.send(response);
});

vR.patch("/vehicles/:id", async (req, res) => {
  try {
    const response = await vehiclesS.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    response.save();
    console.log(response);
    res.send(response);
  } catch (e) {
    res.send(e);
  }
});

vR.delete("/vehicles/:id", async (req, res) => {
  try {
    await vehiclesS.findByIdAndDelete({ _id: req.params.id });
    res.send("Deleted!");
  } catch (e) {
    res.send(e);
  }
});

module.exports = vR;
