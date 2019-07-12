import axios from 'axios';

export const getProducts = () => {
    return axios.get("http://localhost:7000/products");
};

export const postProduct = (formData, config) => {
    return axios.post("http://localhost:7000/products", formData, config);
};
