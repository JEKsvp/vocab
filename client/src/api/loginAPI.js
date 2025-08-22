import axios from 'axios';

export const login = (username, password) => {
  return new Promise(async (resolve, reject) => {
    let requestBody = {
      username: username,
      password: password
    };
    axios.post('/v1/login', requestBody).then(
      response => resolve(response.data),
      err => reject(err)
    );
  })
}

export const logout = () => {
  return new Promise(async (resolve, reject) => {
    axios.post('/v1/logout').then(
      response => resolve(response.data),
      err => reject(err)
    );
  })
}