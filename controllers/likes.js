const User = require('../models/User');


const likeMovie = async (req, res) => {
  try {
    const userId = req.params.id;
    const { titulo, descripcion, imagen, id } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const movieExists = user.moviesLiked.some(movie => movie.id === id);

    if (movieExists) {
      return res.status(400).json({ message: 'La película ya está en la lista' });
    }

    user.moviesLiked.push({ titulo, descripcion, imagen, id });

    await user.save();

    res.status(201).json({ message: 'Película guardada en la lista de favoritos' });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const deslike = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const movieIndex = user.moviesLiked.findIndex(movie => movie._id.toString() === movieId);

    if (movieIndex === -1) {
      return res.status(400).json({ message: 'La película no está en la lista' });
    }

    user.moviesLiked.splice(movieIndex, 1);

    await user.save();

    res.status(200).json({ message: 'Película eliminada de la lista de favoritos' });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { deslike };






module.exports = {
  likeMovie,
  deslike
};
