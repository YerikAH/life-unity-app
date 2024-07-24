import axios from "axios";

const boardAPI = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/boards/",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
    },
})

// Crear Board
export const createdBoard = async (data) => {
    try {
        const response = await boardAPI.post('/', data);
        return {
            message: 'Board creado con éxito',
            type: 'success',
            data: response.data,
        };
    } catch (error) {
        console.error('Error al Crear el Board: ', error);
        throw error;
    }
};

export const updatedBoard = async (data) => {
    try {
        const response = await boardAPI.put(`/${data.id}/`, data);
        return {
            message: 'Board creado con éxito',
            type: 'success',
            data: response.data,
        };
    } catch (error) {
        console.error('Error al Actualizar el Board: ', error);
        throw error;
    }
}