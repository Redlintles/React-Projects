import {api, requestConfig} from "../utils/config";

// Get User details

const profile = async(data, token) => {
  const config = requestConfig("GET",data,token);

  try {
    const res = await fetch(api+"/users/profile", config)
      .then(data => data.json())
      .catch(err => err);

    return res;

  } catch (err) {
    console.log(err);
  }
}

const updateProfile = async(data, token) => {
  const config = requestConfig("PUT",data, token, true);

  try {
    const res = await fetch(api + "/users/", config)
      .then(data=> data.json())
      .catch(err => err);
    
    return res;
  } catch(err) {
    console.log(err);
  } 
}

const getUserDetails = async(id) => {
  const config = requestConfig("GET");

  try {

    const res = await fetch(api + `/users/${id}`, config )
      .then(data => data.json())
      .catch(err => err);

    return res;


  } catch (error) {
    console.log(error);
  }

}

const usersService = {
  profile,
  updateProfile,
  getUserDetails,
}

export default usersService