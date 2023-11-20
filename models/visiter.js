const mongoose = require("mongoose");
const shortid = require("shortid");

const VisitSchema = new mongoose.Schema({
  _id: { type: String, default: shortid.generate },
  name: {
    type: String,
  },
  enterprise: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  registered: {
    type: Boolean,
    default: false,
  },
  registeredDate: {
    type: Date,
  },
  coming: {
    type: Boolean,
    default: false,
  },
  comingDate: {
    type: Date,
  },
  note: {
    type: String,
  },


});
const Visit = mongoose.model("Visit", VisitSchema);

module.exports = Visit;
