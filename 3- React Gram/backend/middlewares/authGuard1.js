const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require("mongoose");

const authGuard = async(req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) {
    return res.status(401).json({errors: ["Acesso negado!"]})
  }

  try {

    const verified = jwt.verify(token, jwtSecret);

    if(verified) {

      req.user = await User.findById(mongoose.Types.ObjectId(verified.id)).select("-password");
  
      return next();
    }

    throw new Error("Problemas à vista")


  } catch(error) {
    res.status(401).json({errors: ["Token inválido!"]})
  }
}

module.exports = authGuard