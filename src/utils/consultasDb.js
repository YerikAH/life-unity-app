import {jwtDecode} from "jwt-decode";
import { API_URL, ENDPOINTS } from "./endpoints";

export const iniciarSesion = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}${ENDPOINTS.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al refrescar el token");
    }

    const dataResponse = await response.json();
    localStorage.setItem("accessToken", dataResponse.access);
    localStorage.setItem("refreshToken", dataResponse.refresh);
    return dataResponse;
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return false;
  }
};

export const registrarUsuario = async (data) => {
  const response = await fetch(`${API_URL}${ENDPOINTS.REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const dataResponse = await response.json();
  return dataResponse;
};

export const registrarUsuarioGoogle = async (data) => {
  const response = await fetch(`${API_URL}${ENDPOINTS.REGISTER}`, {
    method: "POST",
    body: data,
  });
  const dataResponse = await response.json();
  return dataResponse;
}

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (error) {
    return true; // Si hay un error al decodificar el token, lo consideramos expirado
  }
};

// Maneja la solicitud para refrescar el token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No hay un token de refresco");
    }
    const response = await fetch(`${API_URL}${ENDPOINTS.REFRESH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Error al refrescar el token");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access);
    return true;
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return false;
  }
};

export const obtenerInfoToken = () => {
  const token = localStorage.getItem("accessToken") || "";
  if (!token) {
    return {};
  }
  const decoded = jwtDecode(token);
  return decoded;
};

export const obtenerUsuario = async () => {
  const idByToken = obtenerInfoToken().user_id;
  const response = await fetch(
    `${API_URL}${ENDPOINTS.USER}${idByToken}`
  );
  const dataResponse = await response.json();
  return dataResponse;
};

export const obtenerDatos = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (data) => {
  const idByToken = obtenerInfoToken().user_id;
  const response = await fetch(
    `${API_URL}${ENDPOINTS.USER}${idByToken}`,
    {
      method: "PUT",
      body: data,
    }
  );
  const dataResponse = await response.json();
  return dataResponse;
};

export const fetchDatos = async (url, method) => {
  try{
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    if(!response.ok){
      throw new Error("Error al hacer la solicitud");
    }
    const dataResponse = await response.json();
    return dataResponse;
  }catch (error){
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};

export const crudDatos = async (url, data, method) => {
  try{
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    });
    if(!response.ok){
      throw new Error("Error al hacer la solicitud");
    }
    const dataResponse = await response.json();
    return dataResponse;
  }catch(error){
    console.error("Error al hacer la solicitud:", error);
    return false;
  }
};
