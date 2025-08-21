import axios from 'axios';
import {router} from "../../App";

export default function setupAuthInterceptor() {

    axios.interceptors.response.use(
        (config) => {
            return config;
        },
        async (error) => {
            let response = error.response;

            if (response.status === 401) {
                router.navigate("/login")
            }
            return Promise.reject(error);
        }
    );
}