const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    if (!nombre || !apellido || !email || !password) {
      return res.status(400).send({ status: 'error', message: 'Todos los campos son obligatorios' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).send({ status: 'error', message: 'Ya existe un usuario con este correo electrónico' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nombre,
      apellido,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).send({ status: 'success', message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: 'error', message: 'Error al registrar usuario' });
  }
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(400).json({ menssage: 'User no found' })
  }
  const matchPassword = await User.comparePassword(req.body.password, user.password)
  if (!matchPassword) {
    return res.status(400).json({ token: null, menssage: 'contrasena no valida' })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWRSECRET, {
    expiresIn: 86400
  })

  res.status(200).json({ usuario: user, token })
};

const profile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const userProfile = {
      _id: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      movies_likes: user.moviesLiked
    };

    res.status(200).json({ profile: userProfile });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};



module.exports = {
  signUp,
  login,
  profile
};
