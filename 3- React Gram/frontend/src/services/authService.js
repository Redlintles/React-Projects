import { api, requestConfig } from "../utils/config";

const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (err) {
    console.log(err);
  }
};

// Logout

const logout = () => {
  localStorage.removeItem("user");
};

// Login

const login = async (data) => {
  const config = requestConfig("POST", data);

  try {

    const res = await fetch(api + "/users/login", config)
      .then((data) => data.json())
      .catch((err) => err)

    if(res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;


  } catch (err) {
    console.log(err);
  }
}

const authService = {
  register,
  logout,
  login
}

export default authService;