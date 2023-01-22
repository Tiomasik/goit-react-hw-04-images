import axios from 'axios';

function getAxios(searchName, page) {
    const url = "https://pixabay.com/api/";
    const parameters = {
        key: '31299915-b383d5b151d1dc364952a6f73',
        lang: 'en',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    }
    const { key, lang, image_type, orientation, per_page } = parameters;
    return axios.get(`${url}?key=${key}&q=${searchName}&page=${page}&per_page=${per_page}&lang=${lang}&image_type=${image_type}&orientation=${orientation}`)
};

export default getAxios;