const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  nama: { type: String, required: true },
  nim: {
    type: String, required: true, unique: true, dropDups: true,
  },
  prodi: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;

