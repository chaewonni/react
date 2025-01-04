import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: "3a7a84032d3374e7805fea28cca7e210",
        language: "ko-KR"
    }
});

export default instance;