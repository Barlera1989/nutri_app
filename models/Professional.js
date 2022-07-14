import mongoose from "mongoose";
const { Schema } = mongoose;

const professionals = new Schema({
  name: String,
  email: String,
  password: String,
  active: Boolean,
  session: {
    token: String,
    expires: Date,
  },
  created_at: Date,
  patients: [
    {
      name: String,
      email: String,
      password: String,
      active: Boolean,
      created_at: Date,
      prescriptions: [String],
      notes: [String],
      daily_meal: [Object],
      medical_records: [String],
    },
  ],
});

const Professionals = mongoose.model("Professionals", professionals);

export { Professionals };
