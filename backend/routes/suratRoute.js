const router = require('express').Router();
let Surat = require('../models/suratModel');
const jwtAuth = require('../util');

const { isAuth, isAdmin, getToken } = jwtAuth;

router.get('/allSurat', isAuth, isAdmin, async (req, res) => {
  try {
    const allSurat = await Surat.find()
    if (allSurat) {
      res.status(200).send(allSurat);
    } else {
      res.status(404).send({ message: 'Surat not Found' });
    }
  } catch (error) {
    res.status(404).send({ message: error });
  }
})

router.get('/:id', isAuth, async (req, res) => {
  try {
    const getSurat = await User.find({ nim: req.params.nim })
    if (getSurat) {
      res.status(200).send(getSurat)
    } else {
      res.status(404).send({ message: 'Surat not Found' });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
})

router.post('/', isAuth, async (req, res) => {
  const newSurat = new Surat({
    user: req.body._id,
    noSurat: req.body.noSurat,
    pemohon: req.body.pemohons,
    jenis: req.body.jenis,
    penerima: req.body.penerima,
    acara: req.body.acara,
    pengirim: req.body.pengirim,
    link: req.body.link,
    status: {
      status: req.body.status,
      tgl: req.body.tgl,
      revisi: req.body.revisi,
      admin: req.body.admin,
    },
    expand: {
      kepada: req.body.kepada,
      lampiran: req.body.lampiran,
      hal: req.body.hal,
      keterangan: req.body.keterangan,
    }
  })

  try {
    const postSurat = await newSurat.save()
    if (postSurat) {
      res.status(200).send({ message: 'Surat Berhasil Ditambahkan' })
    } else {
      res.status(404).send({ message: 'Surat Gagal Ditambahkan' })
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

module.exports = router;

