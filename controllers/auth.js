const User = require('../models/User');
const bcrypt = require('bcrypt');

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

};

module.exports = {
  signUp,
  login
};
