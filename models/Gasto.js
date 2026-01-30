const mongoose = require('mongoose');

const GastoSchema = new mongoose.Schema({
  usuario: {
    nombre: { type: String, required: true },
    fotoUrl: { type: String, required: true }
  },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, required: true }
});

module.exports = mongoose.model('Gasto', GastoSchema);
