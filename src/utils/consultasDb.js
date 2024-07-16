import { jwtDecode } from "jwt-decode";

export const validarToken = () => {
  let decodedToken = obtenerInfoToken();
  if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
    return true; // Token valido
  } else {
    return false; // Token invalido
  }
};

export const iniciarSesion = async (username, password) => {
  const response = await fetch("http://127.0.0.1:8000/api/v1/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

export const obtenerInfoToken = () => {
  const token = JSON.parse(localStorage.getItem("token")).access;
  let decodedToken = null;
  try {
    decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const registrarUsuario = async (data) => {
  const response = await fetch("http://127.0.0.1:8000/api/v1/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    //
  });
  const dataResponse = await response.json();
  return dataResponse;
};

export const obtenerUsuario = async () => {
  const idByToken = obtenerInfoToken().user_id;
  const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${idByToken}/`);
  const dataResponse = await response.json();
  return dataResponse;
};

export const obtenerDatos = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token").accessToken,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};

// export const postDatos = async (url, data)=>{

// }
