const express = require("express");
const router = express.Router();

// Controller

const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos
} = require("../controllers/PhotoController");

// Middlewares

const {
  photoInsertValidation,
  photoUpdateValidation,
  photoCommentValidation
} = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");

router.post("/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);

router.get("/search",
  authGuard,
  validate,
  searchPhotos
)
router.delete("/:id",
  authGuard,
  deletePhoto
);

router.get("/",
  authGuard,
  getAllPhotos
);

router.get("/user/:id",
  authGuard,
  getUserPhotos
)

router.get("/:id",
  authGuard,
  validate,
  getPhotoById
  )
  
router.put("/:id",
  authGuard,
  photoUpdateValidation(),
  validate,
  updatePhoto
)

router.put("/like/:id",
  authGuard,
  likePhoto
)

router.put("/comment/:id",
  authGuard,
  photoCommentValidation(),
  validate,
  commentPhoto
)



// Routes

module.exports = router;