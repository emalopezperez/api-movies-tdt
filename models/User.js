const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserScheme = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      trim: true
    },
    moviesLiked: [
      {
        id: { type: Number },
        titulo: { type: String },
        descripcion: { type: String },
        imagen: { type: String },
      }
    ],

    createdAt: {
      type: Date,
      default: Date.now
    }
  },
)

UserScheme.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserScheme.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

module.exports = mongoose.model("user", UserScheme)

