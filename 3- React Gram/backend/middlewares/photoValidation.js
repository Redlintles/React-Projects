const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
        .withMessage("O título é obrigatório!")
      .isString()
        .withMessage("O título é obrigatório!")
      .isLength({min:3})
        .withMessage("O título precisa ter no mínimo 3 caracteres!"),
    body("image")
      .custom((val,{req})=> {
        if(!req.file) {
          throw new Error("A imagem é obrigatória!");
        }
        return true
      })    
  ]
}

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
        .withMessage("O Título é obrigatório")
      .isLength({min: 3})
        .withMessage("O título precisa ter no mínimo 3 caracteres")
  ]
}

const photoCommentValidation = () => {
  return [
    body("comment")
      .isString()
        .withMessage("O comentário é obrigatório")
      .isLength({max: 1000})
        .withMessage("O comentário deve ter no máximo 1000 caracteres")
  ]
}

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  photoCommentValidation,

};