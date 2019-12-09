export const setupAxios = (axios, store) => {
  axios.interceptors.response.use((response) => {
    return response
  }, function (error) {
    return Promise.reject(error.response);
  });

  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = authToken;
      }

      config.headers['Content-Type'] = 'application/json';

      return config;
    },
    err => Promise.reject(err)
  );
};
