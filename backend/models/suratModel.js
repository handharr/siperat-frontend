const { mongo } = require("mongoose")

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statusSchema = new Schema(
  {
    status: { type: String, default: 'Proses' },
    tgl: { type: Date, default: new Date() },
    revisi: { type: String, default: '' },
    admin: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const expandSchema = new Schema({
  kepada: { type: String, default: '', required: true },
  lampiran: { type: String, default: '' },
  hal: { type: String, default: '' },
  keterangan: { type: String, default: '' },
})

const suratSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  noSurat: { type: String, default: '', unique: true },
  pemohon: { type: String, required: true, default: '' },
  jenis: { type: String, required: true, default: '' },
  penerima: { type: String, required: true, default: '' },
  acara: { type: String, required: true, default: '' },
  pengirim: { type: String, required: true, default: '' },
  link: { type: String, required: true, default: '' },
  status: statusSchema,
  expand: expandSchema
}, {
  timestamps: true
})

const Surat = mongoose.model('Surat', suratSchema);

module.exports = Surat;

