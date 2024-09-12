import { baseUrl, checkResponse, request } from "./api";

//sign up
function signUp({ name, avatar, email, password }) {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Add Content-Type header
    },
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  });
}

//sign in

function signIn({ email, password }) {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Add Content-Type header
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

function checkToken(token) {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export { signUp, signIn, checkToken };
