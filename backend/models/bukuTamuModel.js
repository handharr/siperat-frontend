const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bukuTamuSchema = new Schema({
  nama: { type: String, required: true },
  asal: { type: String, required: true, default: '' },
  kontak: { type: String, required: true, default: '' },
  keperluan: { type: String, required: true, default: '' },
  tanggalAcara: { type: Date },
}, {
  timestamps: true
})

const BukuTamu = mongoose.model('BukuTamu', bukuTamuSchema);

module.exports = BukuTamu;

