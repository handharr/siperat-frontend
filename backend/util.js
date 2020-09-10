const jwt = require('jsonwebtoken');

//membuat token
const getToken = user => {
  return jwt.sign({
    _id: user._id,
    nama: user.nama,
    nim: user.nim,
    prodi: user.prodi
  }, 'ini rahasia',
    {
      expiresIn: '48hr'
    }
  )
}

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const tokenOnly = token.split(' ')[1];

    jwt.verify(tokenOnly, 'ini rahasia', (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    })
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
}

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

export { getToken, isAuth, isAdmin };

