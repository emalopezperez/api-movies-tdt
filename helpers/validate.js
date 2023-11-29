const validator = require('validator')

const validate = (params) => {
  let nombre = !validator.isEmpty(params.nombre) && validator.isLength(params.nombre, { min: 3, max: undefined })
  let apellido = !validator.isEmpty(params.apellido) && validator.isLength(params.apellido, { min: 3, max: undefined })
  let email = !validator.isEmpty(params.email) && validator.isEmail(params.email)
  let password = !validator.isEmpty(params.password)

  if (!nombre || !apellido || !email || !password) {
    console.log("no se supero la validacion")
  }

  console.log("Se supero la validacion")
}

module.exports = {
  validate
}