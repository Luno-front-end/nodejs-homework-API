const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true, // Унікальність true/false
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: true,
    },
    number: {
      type: String,
      required: [true, "Set number for contact"],
      unique: true,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data),
    },
    owner: {
      name: String,
      email: String,
      age: Number,
      number: String,
      address: String,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.virtual("id").get(function () {
  return this._id;
});

const Contact = model("contact", contactSchema);

module.exports = Contact;
