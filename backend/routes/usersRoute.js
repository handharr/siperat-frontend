const router = require('express').Router();
let User = require('../models/userModel');
const jwtAuth = require('../util');

const { isAuth, isAdmin, getToken } = jwtAuth;

// get all user
router.get('/', async (req, res) => {
  try {
    const allUser = await User.find()
    if (allUser) {
      res.status(200).send(allUser);
    }
  } catch (error) {
    res.status(404).send({ message: error });
  }
})

// get an admin
router.get('/checkAdmin/:nim', async (req, res) => {
  try {
    const user = await User.findOne({
      nim: {
        $eq: req.params.nim
      },
      isAdmin: {
        $eq: true,
      }
    })
    console.log(user);
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send({ message: 'User not Found' });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
})

// get one user
router.get('/:nim', async (req, res) => {
  try {
    const user = await User.findOne({ nim: req.params.nim })
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send({ message: 'User not Found' });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
})

// register new user
router.post('/register', async (req, res) => {
  // console.log(req.body)
  const user = new User({
    nama: req.body.nama,
    nim: req.body.nim,
    prodi: req.body.prodi,
    isAdmin: req.body.isAdmin
  })
  try {
    const postUser = await user.save();
    console.log('abis post user ', postUser)
    if (postUser) {
      res.status(200).send({ message: 'User Berhasil Ditambahkan' })
    } else {
      res.status(400).send({ message: 'User Gagal Ditambahkan' })
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

// user login 
router.get('/login', async (req, res) => {
  try {
    const loginUser = await User.findOne({
      nim: req.body.nim,
    });

    if (loginUser) {
      res.status(200).send({
        _id: loginUser._id,
        nim: loginUser.nim,
        nama: loginUser.nama,
        prodi: loginUser.prodi,
        isAdmin: loginUser.isAdmin,
        token: getToken(loginUser)
      })
    } else {
      res.status(401).send({ message: 'Invalid Email or Password.' });
    }
  } catch (error) {
    res.status(400).send({ message: 'Request Gagal' })
  }
})

module.exports = router;

