const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conn = require("../config/db");
const mongoose = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.siatus(422).json({
      errors: [
        "Por favor, Utilize outro e-mail"
      ]
    })
    return;
  }

  // Generate password hash

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: passwordHash
  })

  if (!newUser) {
    res
      .status(422)
      .json({
        errors: ["Houve um erro, por favor, tente mais tarde"]
      });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id)
  });

  return;
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado"] });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha Inválida"] });
    return;
  }

  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id)
  });

  return;
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage;

  if (req.file) {
    profileImage = req.file.filename
  }

  const reqUser = req.user

  const user = await
    User.findById(
      mongoose.Types.ObjectId(reqUser._id))
      .select("-password");

  if (name) {
    user.name = name
  }
  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage
  }

  if (bio) {
    user.bio = bio
  }

  await user.save()

  res.status(200).json(user);

};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(
      mongoose.Types.ObjectId(id))
      .select("-password");

    if(!user) {
      throw new Error("")
    }

    res.status(200).json(user);
  } catch (err) {

    res.status(404).json({ errors: ["O usuário não existe!"] })
    return;
  }
};




module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById
};