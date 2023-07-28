const Photo = require("../models/Photo");
const User = require("../models/User");

const mongoose = require("mongoose");

const conn = require("../config/db");

// Insert a photo, with an user related tweet

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user

  const user = await User.findById(reqUser._id);

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, por favor, tente novamente mais tarde!"]
    });
    return;
  }

  return res.status(201).json(newPhoto)

};

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  const photo = await Photo.findById(mongoose.Types.ObjectId(id))

  if (!photo) {
    res
      .status(404)
      .json({
        errors: [
          "Foto não encontrada"
        ]
      })
    return;
  }

  if (!(photo.userId.equals(reqUser._id))) {
    res
      .status(422)
      .json({
        errors: [
          "Ocorreu um erro, por favor tente mais tarde"
        ]
      })
    return;
  }

  await Photo.findByIdAndDelete(photo._id);

  return res
    .status(200)
    .json({
      id: photo._id,
      message: "Foto deletada com sucesso!"
    })

};

const getAllPhotos = async (req, res) => {
  const photos = await
    Photo
      .find({})
      .sort([["createdAt", -1]])
      .exec();
  return (
    res
      .status(200)
      .json(photos)
  );
};

const getUserPhotos = async (req, res) => {

  const { id } = req.params;
  const photos = await
    Photo
      .find({
        userId: id
      })
      .sort([["createdAt", -1]])
      .exec();

  return res.status(200).json(photos);
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;
  

  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  if (!photo) {
    return res.status(404).json({ errors: ["Foto não encontrada!"] })
  }
  return res.status(200).json(photo);
};

const updatePhoto = async (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  const reqUser = req.user;

  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  if (!photo) {
    return res.status(404).json({ errors: ["Foto Não encontrada"] });
  }

  if (!photo.userId.equals(reqUser._id)) {
    return res.status(422).json({ errors: ["Houve algum erro! por favor, tente mais tarde"] })
  }

  if (title) {
    photo.title = title;
  }

  await photo.save();

  return res.status(200).json({
    photo,
    message: "Foto Atualizada com sucesso!"
  }
  );
};

const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  if (photo.likes.includes(reqUser._id)) {
    return res.status(422).json({ errors: ["VocÊ já curtiu a foto!"] })
  }

  photo.likes.push(reqUser._id);

  await photo.save();

  return res.status(200).json({
    photoId: id,
    userId: reqUser._id,
    message: "A Foto foi curtida!"
  });

};

const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  const { comment } = req.body;

  if (!comment) {
    res.status(404).json({ errors: ["Comentário é obrigatório"] });
  }

  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  const user = await User.findById(reqUser._id);

  photo.comments = [];

  photo.comments = [
    ...photo.comments,
    {
      photoId: id,
      userId: reqUser._id,
      userName: user.name,
      userImage: user.profileImage,
      comment
    }

  ]

  await photo.save();

  return res.status(200).json({
    photo,
    message: "Comentário Adicionado com sucesso!",
    comment
  });
};


const searchPhotos = async(req, res) => {
  res.send("aaaaa");
}

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos
}