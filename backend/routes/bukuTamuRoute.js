const router = require('express').Router();
let BukuTamu = require('../models/bukuTamuModel');

router.route('/').get(async (req, res) => {
  try {
    const allBukuTamu = await BukuTamu.find()
    if (allBukuTamu) {
      res.status(200).send(allBukuTamu);
    } else {
      res.status(401).send({ message: 'Gagal Mengambil Buku Tamu' });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
})

router.route('/').post(async (req, res) => {
  const newBukuTamu = new BukuTamu({
    nama: req.body.nama,
    asal: req.body.asal,
    kontak: req.body.kontak,
    keperluan: req.body.keperluan,
    tanggalAcara: req.body.tgl,
  })

  try {
    const postBukuTamu = await newBukuTamu.save()
    if (postBukuTamu) {
      res.status(200).send({ message: 'Buku Tamu Berhasil Ditambahkan' })
    } else {
      res.status(401).send({ message: 'Buku Tamu not found' })
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

module.exports = router;

