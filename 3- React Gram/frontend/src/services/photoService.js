import { api, requestConfig } from "../utils/config";


const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {

    const res = await fetch(api + "/photos", config)
      .then(res => res.json())
      .catch(err => err);


    return res;


  } catch (err) {
    console.log(err);
  }
};

const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);
  try {

    const res = await fetch(api + `/photos/user/${id}`, config)
      .then(data => data.json())
      .catch(err => err);

    return res

  } catch (err) {
    console.log(err);
  }
};

const deletePhoto = async (photoId, token) => {
  const config = requestConfig("DELETE", null, token);
  try {
    const res = await fetch(`${api}/photos/${photoId}`, config)
      .then(res => res.json())
      .catch(err => err);

    return res;

  } catch (err) {
    console.log(err);
  }
};

const updatePhoto = async (data, photoId, token) => {
  const config = requestConfig("PUT", data, token);


  try {
    const res = await fetch(`${api}/photos/${photoId}`, config)
      .then(data => data.json())
      .catch(err => err);

    return res;
  } catch (err) {
    console.log(err);
  }
};

const getPhotoById = async (photoId, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/photos/${photoId}`, config)
      .then(data => data.json())
      .catch(err => err);

    return res;
  } catch (err) {
    console.log(err);
  }
};

const likePhoto = async (photoId, token) => {
  const config = requestConfig("PUT", null, token);

  try {

    const res = await fetch(`${api}/photos/like/${photoId}`, config)
      .then(data => data.json())
      .catch(err => err);

    return res;

  } catch (err) {
    console.log(err);
  }
};

const commentPhoto = async (data, photoId, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(`${api}/photos/comment/${photoId}`, config)
      .then(data => data.json())
      .catch(err => err);

    return res;

  } catch (err) {
    console.log(err);
  }
};

const getAllPhotos = async (token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(`${api}/photos`, config)
      .then(data => data.json())
      .catch(err => err);

    return res;
  } catch (err) {
    console.log(err);
  }
};

const searchPhotos = async(query,token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(`${api}/photos/search?q=${query}`,config)
      .then(data => data.json())
      .catch(err => err);

    return res;
  } catch(err) {
    console.log(err);
  }
}

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhotoById,
  likePhoto,
  commentPhoto,
  getAllPhotos,
  searchPhotos
}


export default photoService

