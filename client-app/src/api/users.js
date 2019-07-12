import axios from 'axios';

export const uploadUserImage = (formData, headers) => {
    return axios.post("http://localhost:8000/users/photo", formData, headers);
};
