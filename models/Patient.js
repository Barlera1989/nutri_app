import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
const objectId = mongoose.Types.ObjectId;

const patients = new Schema({
  professionalId: objectId,
  professional: String,
  name: String,
  email: String,
  password: String,
  active: Boolean,
  created_at: Date,
  receitas: Array,
  observações: Array,
  cardapio: {
    randomKey: String,
  },
  prontuario: {
    titulo: String,
    data: Date,
    descrição: String,
  },
});

const Patients = mongoose.model("Patients", patients);

export { Patients };
