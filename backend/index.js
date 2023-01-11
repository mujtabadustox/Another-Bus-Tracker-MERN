const express = require("express");
const app = express();
const sR = require("./routes/stops");
const vR = require("./routes/vehiclesroutes");
const rR = require("./routes/route");
const dR = require("./routes/direction");
const pR = require("./routes/patterns");
const tR = require("./routes/time");
let cors = require("cors");

app.use(cors());

const mongoose = require("mongoose");
const { double } = require("webidl-conversions");
mongoose
  .connect("mongodb://127.0.0.1:27017/ass3_afs")
  .then((x) => {
    console.log(`Connected: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error", err.reason);
  });

app.use(express.json());
app.use("/stops", sR);
app.use("/vehicles", vR);

app.use("/routes", rR);
app.use("dirs", dR);

app.use("/pat", pR);
app.use("/tim", tR);

app.listen("4000", (req, res) => {
  console.log("Server running on 4000");
});
