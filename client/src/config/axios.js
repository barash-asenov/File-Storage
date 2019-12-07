import axios from 'axios';


export const setupAxios = () => {
  axios.interceptors.response.use((response) => {
    return response
  }, function (error) {
    return Promise.reject(error.response);
  });

  axios.interceptors.request.use(
    config => {
      // const {
      //   auth: { authToken }
      // } = store.getState();

      // if (authToken) {
      //   config.headers.Authorization = `Bearer ${authToken}`;
      // }

      return config;
    },
    err => Promise.reject(err)
  );
};
