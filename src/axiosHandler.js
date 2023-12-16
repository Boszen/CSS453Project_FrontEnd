// axiosInstance.js
import axios from 'axios';

const api_base_url = process.env.REACT_APP_BACKEND_URL;
const axiosCentral = axios.create();

axiosCentral.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    config.headers.Authorization = `${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosCentral.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 403) {
        try {
          const refreshToken = localStorage.getItem('refresh_token'); 
          const refreshResponse = await axios.get(`${api_base_url}/api/user/refreshJWTToken`, {
            headers: {
                'Authorization': refreshToken,
                'ngrok-skip-browser-warning': 'asd'
            }
          });
  
          console.log(refreshResponse.data);
  
          const { access_token, refresh_token } = refreshResponse.data.data.token;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
  
          axiosCentral.defaults.headers.common['Authorization'] = `${access_token}`;
  
          return axios(error.config);
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);

          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  

export default axiosCentral;

